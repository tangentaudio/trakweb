#!/bin/bash
TEMPLATE_DIR=`pwd`/bundle-template
LX2_SW_URL="https://www.southwesternindustries.com/media/software/lx2_400.exe?rev=45854"
MX3_SW_URL="https://www.southwesternindustries.com/media/software/mx3_24206.exe?rev=50815"
LX2_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/20099_manual.pdf?rev=153931"
MX3_MANUAL_URL="https://www.southwesternindustries.com/media/manuals/16992_manual.pdf?rev=153931"
LX2_BUNDLE=`pwd`/public/lx2.bundle
MX3_BUNDLE=`pwd`/public/mx3.bundle


fetch_and_unzip_software()
{
    URL=$1
    OUT="$2.exe"
    IMG="$2.img"

    if [ ! -f ${OUT} ]; then
        echo fetching $2 software from ${URL}
        wget ${URL} -O ${OUT}
    fi

    if [ ! -f ${IMG} ]; then
        echo unzipping ${OUT}
        unzip ${OUT}
        mv *.IMA ${IMG}
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


mkdir -p _work
cd _work

fetch_and_unzip_software ${LX2_SW_URL} lx2
fetch_and_unzip_software ${MX3_SW_URL} mx3

#extract_fat_files lx2
#extract_fat_files mx3

make_bundle lx2 ${LX2_BUNDLE}
make_bundle mx3 ${MX3_BUNDLE}

fetch_manual ${LX2_MANUAL_URL} lx2
fetch_manual ${MX3_MANUAL_URL} mx3
