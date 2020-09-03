#!/bin/bash

NEW_PACKAGE_VERSION=$1

# obtains the package version from the package.json file.
# ACTUAL_PACKAGE_VERSION=$(cat package.json |
#     grep version |
#     head -1 |
#     awk -F: '{ print $2 }' |
#     sed 's/[",\t ]//g')s

# replaces the outdated version to the new version from the
# informationCLI.ts, informationalArguments.test.ts and README.md file.
#sed -i -e "s/$NEW_PACKAGE_VERSION/$ACTUAL_PACKAGE_VERSION/g" ./../package.json

# install the latest version of the minifier.
# npm i @josee9988/minifyall --save

# obtain the new version of the MinifyAllCore
NEW_CORE_VERSION=$(npm view @josee9988/minifyall |
    grep "latest" |
    sed 's/[",\t ]//g')

echo $NEW_CORE_VERSION
