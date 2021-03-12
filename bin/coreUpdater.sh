#!/bin/bash

#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#
# SCRIPT:        coreUpdater.sh
# USAGE:         bash coreUpdater.sh | ./coreUpdater.sh
# PURPOSE:       Shell script that receives the new version of the package, obtains the actual version, replaces it,
#                then installs the latest version of the minifyallcli package (minifyall core), writes the basic
#                changelog and, adds all the changes to a commit and pushes it into a new branch.
# TITLE:         coreUpdater.sh
# AUTHOR:        Jose Gracia
# VERSION:       1.0.0
# NOTES:         This script can be called through an npm script: 'npm run update:minifyallcore'
#                When publishing, it should be done from the root directory of the repository.
# BASH_VERSION:  5.0.17(1)-release
# LICENSE:       see in ../LICENSE (project root) or https://github.com/Josee9988/MinifyAll/blob/master/LICENSE
# GITHUB:        https://github.com/Josee9988/
# REPOSITORY:    https://github.com/Josee9988/MinifyAll
# ISSUES:        https://github.com/Josee9988/MinifyAll/issues
# MAIL:          jgracia9988@gmail.com
#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#

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
npm i @josee9988/minifyall@latest --save

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
