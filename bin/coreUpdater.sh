#!/bin/bash

if [ -z "$1" ]; then # check if the new package version was supplied.
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

# replaces the outdated version to the actual one
sed -i -e "s/$ACTUAL_PACKAGE_VERSION/$NEW_PACKAGE_VERSION/g" package.json

# install the latest version of the minifier.
npm i @josee9988/minifyall --save

# # obtain the new version of the MinifyAllCore
NEW_CORE_VERSION=$(npm view @josee9988/minifyall |
    grep "latest" |
    head -1 |
    awk -F: '{ print $2 }' |
    sed 's/[",\t ]//g')

# # write the basic CHANGELOG.md
sed -i "9i\\\n## [**${NEW_PACKAGE_VERSION}**] - ${ACTUAL_DATE}\n\n### Changed\n\n* MinifyAllCli (core) changed by updating the package to its newest version (${NEW_CORE_VERSION})." CHANGELOG.md

# # checkout to new branch, add, commit and push to branch
git checkout -b "update/core-${NEW_CORE_VERSION}"

git add package*
git add CHANGELOG.md

git commit -m "Updated MinifyAllCli (core) to its newest version ${NEW_CORE_VERSION}"

git push origin "update/core-${NEW_CORE_VERSION}"

echo "New branch created with the name \"update/core-${NEW_CORE_VERSION}\" in your repository."
