// ==UserScript==
// @name         LFM-Genius-Icon
// @namespace    https://www.last.fm/
// @version      1.0.0
// @description  Adds an icon under the title of a song in Last.fm to open the page of the song in Genius.com.
// @author       Megane0103
// @match        https://www.last.fm/*
// @grant        none
// @license      MIT; https://github.com/Megane0103/LFM-Genius-Icon/blob/main/LICENSE
// @copyright    2023, Megane0103 (https://github.com/Megane0103)
// ==/UserScript==

(function() {
    'use strict';

    // Getting the song title and artist name from the page URL
    const path = window.location.pathname.split('/');
    let artistName = decodeURIComponent(path[2]).replace(/\+/g, '-').replace(/\s+/g, '-').toLowerCase();
    let songTitle = document.querySelector('.header-new-title').textContent;
    songTitle = songTitle.replace(/\s+/g, '-').toLowerCase();
    // Removing diacritics from artistName and songTitle
    artistName = removeDiacritics(artistName);
    songTitle = removeDiacritics(songTitle);

    // Removing apostrophes and tildes from artistName
    artistName = artistName.replace(/['~]/g, '');

    // Creating a new image element
    const geniusIcon = document.createElement('img');
    geniusIcon.src = 'https://user-images.githubusercontent.com/99014543/224570329-0acca5ae-1ccf-46b2-99b4-5be75a0c494e.png';
    geniusIcon.style.height = '20px';
    geniusIcon.style.width = '20px';

    // Adding a listener to the icon to open the Genius.com page for the song
    geniusIcon.addEventListener('click', function() {
        const url = `https://genius.com/${encodeURIComponent(artistName)}-${encodeURIComponent(songTitle).replace(/[^\w\-]+/g, '')}-lyrics`;
        window.open(url);
    });

    // Inserting the icon under the song title on the page
    document.querySelector('.header-new-title').insertAdjacentElement('afterend', geniusIcon);

    function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
})();