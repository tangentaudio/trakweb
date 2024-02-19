#!/bin/bash
TEMPLATE_DIR=`pwd`/bundle-template

LX2=no
LX2_SW_URL="https://www.southwesternindustries.com/media/software/lx2_400.exe?rev=45854"
LX2_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20099_manual.pdf?rev=153931"
LX2_BUNDLE=`pwd`/public/lx2.bundle

MX3=no
MX3_SW_URL="https://www.southwesternindustries.com/media/software/mx3_24206.exe?rev=50815"
MX3_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20317_manual_CD.pdf?rev=102924"
MX3_BUNDLE=`pwd`/public/mx3.bundle

MX2=no
MX2_SW_URL="`pwd`/private/mx2_on_mx3.img"
MX2_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20317_manual_CD.pdf?rev=102924"
MX2_BUNDLE=`pwd`/public/mx2.bundle

LX2OFF=yes
LX2OFF_SW_URL="`pwd`/private/lx2offline.img"
LX2OFF_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20099_manual.pdf?rev=153931"
LX2OFF_BUNDLE=`pwd`/public/lx2offline.bundle

AGE2OFF=no
AGE2OFF_SW_URL="`pwd`/private/age2offline.img"
AGE2OFF_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20099_manual.pdf?rev=153931"
AGE2OFF_BUNDLE=`pwd`/public/age2offline.bundle

AGE3OFF=yes
AGE3OFF_SW_URL="`pwd`/private/age3offline.img"
AGE3OFF_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20099_manual.pdf?rev=153931"
AGE3OFF_BUNDLE=`pwd`/public/age3offline.bundle


SRC_DIR=`pwd`/src

fetch_and_unzip_software()
{
    URL=$1
    OUT="$2.exe"
    IMG="$2.img"

    if [ $URL == http* ];
    then
        if [ ! -f ${OUT} ]; then
            echo fetching $2 software from ${URL}
            wget ${URL} -O ${OUT}
        fi

        if [ ! -f ${IMG} ]; then
            echo unzipping ${OUT}
            unzip ${OUT}
            mv *.IMA ${IMG}
        fi
    else
        echo copying $2 local image from ${URL}
        cp ${URL} ${IMG}
    fi

}

fetch_manual()
{
    URL=$1
    OUT="../public/$2.pdf"

    if [ ! -f ${OUT} ]; then
        echo fetching $2 manual from ${URL}
        wget ${URL} -O ${OUT}
    fi
}


extract_fat_files()
{
    IMG="$1.img"
    DEST="_$1"

    rm -rf ${DEST}
    mkdir -p ${DEST}

    echo Extracting FAT files...
    mcopy -s -i ${IMG} :: ${DEST}
    ls -al ${DEST}
}

make_bundle_alt()
{
    DIR="_$1"
    BUNDLE=$2

    echo Applying js-dos template...
    cp -r ${TEMPLATE_DIR}/. ${DIR}

    echo building bundle ${BUNDLE}...
    cd ${DIR}
    rm -f ${BUNDLE}
    zip -r ${BUNDLE} .
    cd ..
}

make_bundle()
{
    DIR="_$1"
    IMG="$1.img"
    BUNDLE=$2

    rm -rf ${DIR}
    mkdir -p ${DIR}
    cp ${IMG} ${DIR}/a_drive.img
    cd ${DIR}

    echo Applying js-dos template...
    cp -r ${TEMPLATE_DIR}/. .

    echo building bundle ${BUNDLE}...
    rm -f ${BUNDLE}
    zip -r ${BUNDLE} .
    cd ..
}

process_one()
{
    ID=$1
    DESC=$2
    KEYPAD=$3
    BUNDLE=$4
    SW_URL=$5
    MANUAL_URL=$6

    fetch_and_unzip_software ${SW_URL} ${ID}
    make_bundle ${ID} ${BUNDLE}
    fetch_manual ${MANUAL_URL} ${ID}

    echo "    { id: '${ID}', desc: '${DESC}', bundle: '${ID}.bundle', keypad: '${KEYPAD}' }," >> bundles.tsx
}


mkdir -p _work
cd _work

rm -rf bundles.tsx
echo "export const bundles = [" >> bundles.tsx

[ "$LX2" == "yes" ] && process_one lx2 "LX2 Lathe" lathe ${LX2_BUNDLE} ${LX2_SW_URL} ${LX2_MANUAL_URL}
[ "$MX3" == "yes"] && process_one mx3 "MX3 Mill" mill ${MX3_BUNDLE} ${MX3_SW_URL} ${MX3_MANUAL_URL}

if [ -f ${MX2OFF_SW_URL} ];
then 
    [ "$MX2OFF" == "yes" ] && process_one mx2 "MX2 Mill" mill ${MX2_BUNDLE} ${MX2_SW_URL} ${MX2_MANUAL_URL}
fi


if [ -f ${LX2OFF_SW_URL} ];
then 
    [ "$LX2OFF" == "yes" ] && process_one lx2offline "LX2 Offline" lathe ${LX2OFF_BUNDLE} ${LX2OFF_SW_URL} ${LX2OFF_MANUAL_URL}
fi

if [ -f ${AGE2OFF_SW_URL} ];
then
    [ "$AGE2OFF" == "yes" ] && process_one age2offline "AGE2 Offline" mill ${AGE2OFF_BUNDLE} ${AGE2OFF_SW_URL} ${AGE2OFF_MANUAL_URL}
fi

if [ -f ${AGE3OFF_SW_URL} ];
then
    [ "$AGE3OFF" == "yes" ] && process_one age3offline "AGE3 Offline" mill ${AGE3OFF_BUNDLE} ${AGE3OFF_SW_URL} ${AGE3OFF_MANUAL_URL}
fi

echo "];" >> bundles.tsx
cp bundles.tsx ${SRC_DIR}