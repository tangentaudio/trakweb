#!/bin/bash
FATUTIL=fatutil/fatutil
TEMPLATE_DIR=`pwd`/bundle-template
LX2_URL="https://www.southwesternindustries.com/media/software/lx2_400.exe?rev=45854"
MX3_URL="https://www.southwesternindustries.com/media/software/mx3_24206.exe?rev=50815"
LX2_BUNDLE=`pwd`/public/lx2.bundle
MX3_BUNDLE=`pwd`/public/mx3.bundle

build_fatutil()
{
    if [ ! -f ${FATUTIL} ]; then
        echo building fatutil...
        git clone https://github.com/digitalpeer/fatutil.git
        cd fatutil
        autoreconf --install
        ./configure
        make
        cd ..
    fi
}


fetch_and_unzip()
{
    URL=$1
    OUT="$2.exe"
    IMG="$2.img"

    if [ ! -f ${OUT} ]; then
        echo fetching ${URL}
        wget ${URL} -O ${OUT}
    fi

    if [ ! -f ${IMG} ]; then
        echo unzipping ${OUT}
        unzip ${OUT}
        mv *.IMA ${IMG}
    fi

}

extract_fat_files()
{
    IMG="$1.img"
    DEST="_$1"

    FILES=`${FATUTIL} ${IMG} ls / | awk '{ print $3 }'`

    rm -rf ${DEST}
    mkdir -p ${DEST}

    for F in ${FILES}
    do
        echo $1: extracting file ${F}...
        ${FATUTIL} ${IMG} read '/'${F} ${DEST}/${F}
    done
}

make_bundle()
{
    DIR="_$1"
    BUNDLE=$2

    echo Applying js-dos template...
    cp -r ${TEMPLATE_DIR}/. ${DIR}

    echo building bundle ${BUNDLE}...
    cd ${DIR}
    zip -r ${BUNDLE} .
    cd ..
}

mkdir -p _work
cd _work

build_fatutil
fetch_and_unzip ${LX2_URL} lx2
fetch_and_unzip ${MX3_URL} mx3

extract_fat_files lx2
extract_fat_files mx3

make_bundle lx2 ${LX2_BUNDLE}
make_bundle mx3 ${MX3_BUNDLE}