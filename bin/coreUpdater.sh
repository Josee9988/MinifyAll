#!/bin/bash

if [ -z "$1" ]; then
    echo "Argument \$1 must be supplied with the new package version."
    exit 1
fi

NEW_PACKAGE_VERSION=$1

ACTUAL_DATE=$(date '+%Y-%m-%d')

# obtains the package version from the package.json file.
ACTUAL_PACKAGE_VERSION=$(cat package.json |
    grep version |
    head -1 |
    awk -F: '{ print $2 }' |
    sed 's/[",\t ]//g')

# replaces the outdated version to the new version from the
# informationCLI.ts, informationalArguments.test.ts and README.md file.
#sed -i -e "s/$NEW_PACKAGE_VERSION/$ACTUAL_PACKAGE_VERSION/g" ./../package.json

# install the latest version of the minifier.
# npm i @josee9988/minifyall --save

# obtain the new version of the MinifyAllCore
NEW_CORE_VERSION=$(npm view @josee9988/minifyall |
    grep "latest" |
    head -1 |
    awk -F: '{ print $2 }' |
    sed 's/[",\t ]//g')

# write the basic CHANGELOG.md
sed -i "9i\\\n## [**${NEW_PACKAGE_VERSION}**] - ${ACTUAL_DATE}\n\n### Changed\n\n* MinifyAllCli (core) changed by updating the package to its newest version (${NEW_CORE_VERSION})." test.ignore.md
