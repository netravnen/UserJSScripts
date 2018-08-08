// ==UserScript==
// @name         TitleFixer - RIPE Database
// @namespace    github.com:netravnen:TitleFixer_RIPE_Database
// @version      1.1.5
// @description  Change the title to something meaningful
// @author       netravnen
// @match        https://apps.db.ripe.net/search/lookup.html?source=*&key=*-RIPE&type=person
// @match        https://apps.db.ripe.net/search/lookup.html?source=*&type=person&key=*-RIPE
//
// @match        https://apps.db.ripe.net/search/lookup.html?source=*&key=*&type=mntner
// @match        https://apps.db.ripe.net/search/lookup.html?source=*&type=mntner&key=*
//
// @match        https://apps.db.ripe.net/search/lookup.html?source=*&key=ORG-*-RIPE&type=organisation
// @match        https://apps.db.ripe.net/search/lookup.html?source=*&type=organisation&key=ORG-*-RIPE
// @grant        none
// @UpdateURL    https://gist.githubusercontent.com/netravnen/3854c56c6431c6df5a395b1fddc7d6c2/raw/f4e7f684579dd7847e7fbcd29f538b138e4d3b01/TitleFixer_RIPE_Database.user.js
// @homepageURL  https://gist.github.com/netravnen/3854c56c6431c6df5a395b1fddc7d6c2
/**
Update 1.1.5 2017-10-25 Updated namespace
Update 1.1.4 2017-10-25 Updated author github nickname because was changed in the past + Added @homepageURL
Update 1.1.3 2017-04-03 [..]
Update 1.1.2 2017-04-03 Updated regex to allow for 0 numbers in <chars><numbers>-RIPE strings
Update 1.1.1 2017-04-03 Updated inflexibel regex to of person/org chars in <chars><numbers>-RIPE strings
Update 1.1.0 2017-03-14 Added types maintainer and organization
Update 1.0.0 2017-03-14 Initial Commit
 */
// ==/UserScript==

(function() {
    'use strict';

    var type,title,identity,website;
    identity = document.getElementById( 'results' );
    website = document.getElementById( 'logo' ).getAttribute( 'alt' );
    // Person
    if (location.href.match( /search\/lookup\.html\?source=(ripe|RIPE)\&(key\=([A-Z]{2,4})([0-9]+)?\-RIPE\&type=person|type=person\&key\=([A-Z]{2,4})([0-9]+)?\-RIPE)/ )) {
        type = 'PERSON';
        title = location.href.match( /([A-Z]{2,4})([0-9]+)?\-RIPE/i )[0];
        identity = identity.querySelector( 'ul.attrblock > li:nth-child(1)' );
    }
    // Maintainer
    else if (location.href.match( /search\/lookup\.html\?source=(ripe|RIPE)\&(key\=([a-z0-9]+)\-mnt\&type=mntner|type=mntner\&key\=([a-z0-9]+)\-mnt)/ )) {
        type = 'MAINTAINER';
        title = location.href.match( /([a-z0-9]+)\-mnt/i )[0];
        identity = identity.querySelector( 'ul.attrblock > li:nth-child(2)' );
    }
    // Oranization
    else if (location.href.match( /search\/lookup\.html\?source=(ripe|RIPE)\&(key\=ORG\-([A-Z]{2,4})([0-9]+)?\-RIPE\&type=organisation|type=organisation\&key\=ORG\-([A-Z]{2,4})([0-9]+)?\-RIPE)/ )) {
        type = 'ORGANIZATION';
        title = location.href.match( /ORG\-([A-Z]{2,4})([0-9]+)?\-RIPE/i )[0];
        identity = identity.querySelector( 'ul.attrblock > li:nth-child(2)' );
    }
    title = title.toUpperCase();
    identity = identity.innerHTML.split(":")[1].trim();
    document.title = title + ' - ' + identity + ' - ' + type + ' - ' + website;
    console.log("Title tag splurged - TitleFixer - RIPE Database v1.1");
})();
