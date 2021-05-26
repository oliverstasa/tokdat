/*
* TERMS OF USE fce.js FOR tokdat.cz
* Open source under the BSD License.
* Copyright 2021 Oliver Stasa. All rights reserved.
* Contact (at) oliver.stasa@gmail.com
*/



/*
main rider setup
*/

// globals
let hMpl = 0.55,
    h = $(window).height(),
    tabs = ['t', 'o', 'k', 'd', 'a'],
    tokTabs = ['t', 'o', 'k', 'd', 'a', 't'],
    tabNames = {'t': 'T', 'o': 'O', 'k': 'K', 'd': 'D', 'a': 'A'},
    specials = ['kokot', 'kakat', 'tokdat', 'tokat', 'dakota', 'takt', 'dok', 'katka', 'katoda', 'kkk'];

// data setup
window.source = [];
window.tx = 0;
window.streak = 1;

// taber setup
window.speed = 2000;
window.difficulty = 1000;
window.fall = 5000;

// place epic strings to line
for (ti = 0; ti < 400; ti++) {

    var pick = Math.floor(Math.random()*10);

    if (pick > 6) {
        var special = specials[Math.floor(Math.random()*specials.length)].split('');
            ti--;
            for (l = 0; l < special.length; l++) {
                window.source.push(special[l]);
                ti++;
            }
    } else {
        var rand = tabs[Math.floor(Math.random()*tabs.length)];
        window.source.push(rand);
    }
}

console.log(window.source);


/*
on page open
*/
$(window).on('load', function(){

    var imgs = ['/data/img/sky.gif', '/data/img/fires.gif', '/data/img/kkk.jpg', '/data/img/shit.png', '/data/img/katoda.png', '/data/hlavy/1.png', '/data/hlavy/2.png', '/data/hlavy/3.png', '/data/hlavy/4.png', '/data/hlavy/5.png', '/data/hlavy/6.png', '/data/hlavy/7.png', '/data/hlavy/8.png'],
        img = [];
    window.imgsLoaded = 0;
    window.imgsTotal = imgs.length;

    $('body').append($('<div>').addClass('loadBase center'));
    
    for (var i = 0; i < window.imgsTotal; i++) {
        img[i] = new Image();
        img[i].src = imgs[i];
        img[i].onload = function() {
            window.imgsLoaded++;
                $('body').css({opacity: (window.imgsLoaded/window.imgsTotal)}); // 100*(win...) => %
                /*
                var pos = {'startTop': Math.floor(Math.random()*50)+25, 'startLeft': Math.floor(Math.random()*50)+25},
                    imgUrl = $(this)[0].src;
                setTimeout(function(){
                    $('body').append($('<div>').addClass('hlavoun').css({'background': 'url("'+imgUrl+'") center center no-repeat', 'background-size': 'contain', top: pos.startTop+'vh', left: pos.startLeft+'vw'}).delay(1000).queue(function(){$(this).remove().dequeue();}));
                }, window.imgsLoaded*30);
                */
            startPageCheck();
        }
    }


});



/*
intro page
*/
function startPageCheck() {

    if (window.imgsLoaded == window.imgsTotal) {

        var getIn = 2000;

        $('.loadBase').fadeOut(getIn/1.5, function(){
            $(this).remove();
        });

        $('body').append($('<div>').css({display: 'none'}).addClass('partitura over loading').fadeIn(getIn/2));
        $('body').append($('<div>').css({display: 'none'}).addClass('partitura main loading').fadeIn(getIn/2));
        $('body').append($('<div>').css({display: 'none'}).addClass('tokdat').html('<div>TOKDATTOKDAT</div><div>TOKDATTOKDAT</div>').delay(getIn/4).fadeIn(getIn));
        $('body').append($('<div>').css({display: 'none'}).addClass('startAnnouncer center').html('<h1>ZAČNI STISKEM TL. [MEZERNÍK]</h1>').delay(getIn/1.5).fadeIn(getIn));

        var tokdat = ['T', 'o', 'k', 'D', 'a', 't', 'T', 'o', 'k', 'D', 'a', 't', 'T', 'o', 'k', 'D', 'a', 't'],
            tokSize = tokdat.length,
            tok = 0;

        setInterval(function(){

            var title = '',
                t = tok+1;
            if (t >= tokSize) {t = 0;}
            
            while (t != tok) {
                title += tokdat[t];
                t++;
                if (t == tokSize) {t = 0;}
            }

            document.title = title;

            tok++;
            if (tok == tokSize) {
                tok = 0;
            }

        }, 500);

    } else {
        //console.log(window.imgsLoaded+'/'+window.imgsTotal);
    }

}



/*
on keypress => game mechanic
*/
$(document).on('keydown', function(e){
  
    var code = e.keyCode || e.which,
        char = String.fromCharCode(code);

    /*
    text bonus
    */
    if ($('.tab.now').length && $('.tab.now div').html() == char) {
        $('.progress').append(char).scrollLeft(999999999999999);

        // test for epic string
        var epicStr = [['KOKOT', 50], ['KAKAT', 50], ['TOKDAT', 80], ['KKK', 20], ['DAKOTA', 90], ['KATKA', 55], ['KATODA', 66], ['TOKAT', 50], ['TAKT', 50], ['DOK', 10]],
            str = $('.progress').html();

            for (var s in epicStr) {

                var match = str.lastIndexOf(epicStr[s][0]),
                    take = {'from': match,
                            'to': epicStr[s][0].length},
                    past = str.substr(0, take.from),
                    epic = str.substr(take.from, take.to);

                if (match != -1 && match >= (str.length-epic.length)) { // && $('.progress span').last().html() != epic && str.substr(match-1, 1) != '>' && str.substr(match+1, 1) != '<') {
                    $('.progress').html(past+'<span class="epic">'+epic+'</span>');
                    cheer(epic, epicStr[s][1], true, false);
                    // add score this way, fix
                    $('.score').html($('.score').html()*1+epicStr[s][1]);
                }

            }

        // test for super-epic
        var audioDur = $('audio')[0].duration;

        if (Math.floor(audioDur/(window.speed/1000)-6) == window.streak) {
            cheer('106%', 250, true, true);
        }

    }

    /*
    keycode switch
    */
    switch (code) {
        case 84: tab('t'); break; // t
        case 79: tab('o'); break; // o
        case 75: tab('k'); break; // k
        case 68: tab('d'); break; // d
        case 65: tab('a'); break; // a
        case 32:

            if ($('#play').length) {

                $('#play').trigger('click');

            } else if (!$('body').hasClass('plays') && $('.partitura').length && !$('audio').length) {

                $('body').addClass('plays');

                $('.startAnnouncer').html('<h1><span class="line"><span>T</span><span>O</span><span>K</span><span> </span><span>D</span><span>A</span><span>T</span></span>: LIDOVÁ HUDBA</h1>→ ZAPNI REPRÁKY <span class="how" vid="repraky.mp4">JAK?</span><br><br>→ NACHYSTEJ PRSTY NA KLÁVESY<br>[T] [O] [K] [D] [A] [T] <span class="how" vid="klavesnice.mp4">JAK?</span><br>');

                if (typeof window.videos === 'undefined') {
                    loadFiles(['/data/lidovahudba.mp3', '/data/video/konva.mp4' /*]); */, '/data/video/mara.mp4', '/data/video/tomas.mp4', '/data/video/komar.mp4']);
                }

            } else if ($('audio').length) {

                if ($('audio')[0].paused) {
                    $('body').addClass('plays');
                    $('audio')[0].play();
                    taber(window.speed, window.difficulty, window.fall);
                } else {
                    $('body').removeClass('plays');
                    $('audio')[0].pause();
                }
                
            }

        break; // space
        default: tab('fail'); break;
    }

});



/*
special score annoucments
*/
function cheer(str, pts, comboBreaker, streak) {

    // def
    var specials = [
            ['KOKOT', 'JE TO', 'scoreCombo kokot kokot'+Math.floor(Math.random()*5+1), 40, 2300, false, false],
            ['KAKAT', 'MUSÍŠ JÍT', 'scoreCombo kakat', 50, 1500, false, false],
            ['KATKA', 'BROŽKOVÁ', 'scoreCombo katka', 30, 1200, false, false],
            ['KATODA', 'ŽHAVÍCÍ', 'scoreCombo katoda', 60, 2000, false, false],
            ['KKK', 'ŽHAVÍCÍ', 'scoreCombo kkk', 40, 1200, false, false],
            ['106%', 'PLAYTHROUGH', 'scoreCombo 106', 55, 5555, false, false],
            ['head', 0, 'head h'+Math.floor(Math.random()*8+1), 30, 1000, false, false],
            ['onehead', 0, 'head h'+pts, 30, 500+Math.floor(Math.random()*2000), Math.floor(Math.random()*500), false],
            ['TOKDAT', 'COMBO BREAKER', 0, 0, 0, false, 'tokdat']
        ],
        tabPos = $('.tab').first().find('div').attr('class');

        console.log(tabPos); 29-72
        switch(tabPos) {
            case 'tP1': tabPos = 28; break;
            case 'tP2': tabPos = 37; break;
            case 'tP3': tabPos = 46; break;
            case 'tP4': tabPos = 55; break;
            case 'tP5': tabPos = 64; break;
            case 'tP6': tabPos = 72; break;
        }
        tabPos += 'vw';

    // mount animation
    for (var s = 0; s < specials.length; s++) {
        if (str == specials[s][0]) {
            var comboText = specials[s][1],
                ecpiClass = specials[s][2],
                maxSize = specials[s][3],
                time = specials[s][4],
                delay = specials[s][5],
                specialFce = specials[s][6];
            break;
        }
    }

    // specials
    switch (specialFce) {
        case 'tokdat':
            for (var h = 1; h <= 8; h++) {
                cheer('onehead', h, false, false);
            }
        break;
    }

    // combo annoucer
    if (comboBreaker) {

        $('body').append($('<div>').addClass('comboBreaker').html(comboText+'<h1>'+str+'</h1><h2>+ '+pts+' pts</h2>').animate({top: '25vh', opacity: 1, 'line-height': '10vh'}, 500, function(){
            $(this).delay(500).animate({opacity: 0}, 1500, function(){
                $(this).remove();
            });
        }));

        delay = 250;

    }

    // streak reward
    if (streak) {
        
        var lvl = 0,
            points = '',
            pos = {'top': 40+Math.floor(Math.random()*30),
                   'left': 40+Math.floor(Math.random()*30)};

        switch (true) {
            case pts == 0: streakText = 'SLIPPED!<br><span class="slipped">STREAK BROKEN</span>'; lvl = 4; break;
            case pts == 3: streakText = '5 STREAK: FÉROVEJ STISK'; lvl = 1; break;
            case pts == 5: streakText = '10 STREAK: JESTŘÁBÍ REFLEX'; lvl = 2; break;
            case pts == 10: streakText = '20 STREAK: ČÁVO'; lvl = 3; break;
            case pts == 15: streakText = '30 STREAK: MYSTIK'; lvl = 4; break;
            case pts == 22: streakText = '40 STREAK: BERANÍ TLAPA'; lvl = 5; break;
            case pts == 42: streakText = '50 STREAK: KAPITÁN STISK'; lvl = 6; break;
            case pts == 150: streakText = '100 STREAK: KRALEVIC'; lvl = 7; break;
            case pts == 250: streakText = 'FULL STREAK: BASEMENT DWELLER'; lvl = 8; break;
        }

        if (pts > 0) {
            points = '<h2>+ '+pts+' pts</h2>';
        }

        $('body').append($('<div>')
                 .addClass('streak lvl'+lvl)
                 .css({top: '75vh', left: tabPos, opacity: 0}) // left: '50vw'
                 .html(streakText+points)
                 .animate({top: pos.top+'vh', left: pos.left+'vw', opacity: 1}, 500, 'easeOutQuint', function(){
                    $(this).animate({top: '5vh', left: '5vh', opacity: 0}, lvl*500, 'easeInQuint', function(){
                        $(this).remove();
                    });
        }));

        delay = 250;

    }

    // standart reward
    setTimeout(function(){
        var pos = {'top': Math.floor(Math.random()*50)+25, 'left': Math.floor(Math.random()*50)+25},
            size = Math.floor(Math.random()*10)+maxSize;

        $('body').append($('<div>')
                 .addClass('epicString '+ecpiClass)
                 .css({top: '75vh', left: tabPos, transform: 'translate(-50%, -50%)'})
                 .animate({top: pos.top+'vh', left: pos.left+'vw', width: size+'vh', height: size+'vh', opacity: 1}, time/4, 'easeOutQuint', function(){
                    $(this).animate({top: '5vh', left: '5vh', width: 0, height: 0, opacity: 0}, time, 'easeInQuint', function(){
                        $(this).remove();
                    });
                 }));

    }, delay);

}



function loadFiles(files) {

    window.hudba = false;
    window.videos = [];
    window.progress = {};
    window.filesTotal = files.length;

    $('.startAnnouncer').append($('<h1>').addClass('percentage'));

    var file = [];

    for (var f = 0; f < window.filesTotal; f++) {

        var fileType = files[f].split('.').pop();
        if (fileType == 'mp3' || fileType == 'mp4') {

            // xhr
            file[f] = new XMLHttpRequest();

            file[f].open("GET", files[f], true);
            file[f].responseType = "arraybuffer";

            file[f].onload = function(e) {

                switch (e.currentTarget.responseURL.split('.').pop()) {
                    case 'mp4':
                        var blob = new Blob([e.target.response], {type: 'video/mp4'});
                        window.videos.push(URL.createObjectURL(blob));
                    break;
                    case 'mp3':
                        var blob = new Blob([e.target.response], {type: 'audio/mp3'});
                        window.hudba = URL.createObjectURL(blob);
                    break;
                }

                checkStatus();
            };
            
            file[f].onprogress = function(e) {
                if (e.lengthComputable) {
                    updateProgress(e.loaded/e.total, e.currentTarget.responseURL.split('/').pop());
                }
            };

            file[f].onerror = function(e){
                console.log('error while loading file:', e);
                alert('loading failed, sorry, you must reload (f5)');
            };

            file[f].send();

        } else {
            console.log('error in file type: '+fileType);
        }

    }

}



function updateProgress(pct, target) {

    window.progress[''+target+''] = pct;
    var targets = window.filesTotal,
        total = 0;

    for (var n in window.progress) {
        total += window.progress[n];
    }

    $('.percentage').html(Math.round(total/targets*100*1)/1+'%');

}



function checkStatus() {

    if (window.videos.length == (window.filesTotal-1) && window.hudba) { // -1 for 1 audio file, underline note

        $('.percentage').delay(250).animate({opacity: 0}, 250, function(){
            $(this).html('<span id="play">[<span class="line fast"><span>S</span><span>T</span><span>A</span><span>R</span><span>T</span></span>]').animate({opacity: 1}, 250); // <span class="hoe">→</span> <span class="hoe">←</span></span>
        });

    }

}



// begin the game
$(document).on('click touch', '#play', function(){
    
    $('.tokdat, .startAnnouncer').fadeOut(function(){$(this).remove();});
        
    var getIn = 1000;
        $('body').append($('<div>').css({display: 'none'}).addClass('progress').fadeIn(getIn));
        // $('body').append($('<div>').css({display: 'none'}).addClass('key').fadeIn(getIn));
        $('body').append($('<div>').css({display: 'none'}).addClass('score').html('0').fadeIn(getIn));

    if (!$('.partitura').first().hasClass('loaded')) {
        $('.partitura').addClass('loaded');
    }

    // play audio file
    $('.score').html('0');
    $('body').append($('<audio>').append($('<source>').attr('src', window.hudba)).attr('autoplay', true));

    setTimeout(function(){
        taber(window.speed, window.difficulty, window.fall);
    }, 1200);

});

  

/*
tabs scroller recursion
*/
function taber(speed, difficulty, fall){

    var tab = window.source[window.tx],
        video = window.videos[Math.floor(Math.random()*window.videos.length)],
        timeNow = $('audio')[0].currentTime,
        audioDur = $('audio')[0].duration,
        tabPos = 1;

        switch(tab) {
            case 't':
                if (window.source[window.tx+1] != 'o' && window.source[window.tx+2] != 'k' && Math.random() < 0.5) {tabPos = 6;}
            break;
            case 'o': tabPos = 2; break;
            case 'k': tabPos = 3; break;
            case 'd': tabPos = 4; break;
            case 'a': tabPos = 5; break;
        }

    if (timeNow < 10) { // audioDur-speed/1000*7

        setTimeout(function(){
            if ($('body').hasClass('plays')) {
                taber(speed, difficulty, fall);
            }
        }, speed);

    } else {

        setTimeout(function(){
            $('audio')[0].pause();
            $('body').removeClass('plays');
            $('.main').append($('<div>').html('KONEC').addClass('tab').animate({top: h*(hMpl-((hMpl/100)*(100/fall*difficulty))+h/100*2.5)}, fall-difficulty, 'linear', function(){}));
            // $('.main').append($('<div>').html('<input type="text" placeholder="[ N A M E ]">').addClass('tab').animate({top: h*(hMpl-((hMpl/100)*(100/fall*difficulty))-h/100*2.5)}, fall-difficulty, 'linear', function(){}));
        }, speed*2);

    }

    /*
    loop for files
    */
    var hg = h*hMpl/fall*window.speed; // h*hMpl/window.speed*1000-h/100*5
    $('.main').append($('<div>')
                .append($('<div>').addClass('v')
                    .append($('<video>').attr('controls', false)
                        .append($('<source>').attr('src', video))
                    .attr('autoplay', true).on('loadedmetadata', function(){
                        $(this)[0].currentTime = timeNow;
                    })))
                .addClass('video').css({'height': hg}).animate({top: h*hMpl}, fall, 'linear', function(){
        $(this).remove();
    })
    );

    /* // h*hMpl/
    loop for tabs
    */
    var htmlTabs = '';
    //append($('<div>').html(tabNames[tab]).addClass('tP'+tabPos))
    for (var tb = 0; tb < tokTabs.length; tb++) {
        htmlTabs += '<div';
        if (tb == tabPos) {
            htmlTabs += ' class="win"';
        }
        htmlTabs += '>'+tokTabs[tb]+'</div>';
    }
    setTimeout(function(){
        $('.tab').first().find('div:not(.win)').fadeOut(40);
    }, speed);

    $('.main').append($('<div>').html(htmlTabs).addClass('tab t'+tab+' n'+window.tx).animate({top: h*(hMpl-((hMpl/100)*(100/fall*difficulty)))}, fall-difficulty, 'linear', function(){

        var tabKey = $(this);

        // $('.key').html(tabNames[tab]); //.addClass('k'+tab)
        tabKey.addClass('now').animate({top: h*hMpl}, difficulty, 'linear', function(){ //.removeClass('tt to tk td ta')
            
            tabKey.remove();
            if (!tabKey.hasClass('hit')) {
                score('-', 1);
            }
            // $('.key').html('').removeClass('kt ko kk kd ka hit ouch');

        });

        setTimeout(function(){
            tabKey.removeClass('now');
            // $('.key').html('').removeClass('kt ko kk kd ka hit ouch');
        }, difficulty/2);
        
    })
    );

    window.tx++;

}



/*
score press
*/
function tab(key){

    if ($('.tab.now').length) {

        if ($('.tab.now').hasClass('t'+key)) {
            score('+', 1);
            cheer('head', 1, false, false);
            window.streak++;
        } else {
            score('-', 1);
        }

    }

}



/*
score evaluate
*/
function score(ev, val) {

    if ($('.partitura').first().hasClass('loaded')) {
        
        var score = $('.score').html()*1,
            addOn = 0;
        switch (ev) {
            case '+':

                if (window.streak != 0) {

                    switch (true) {
                        case window.streak % 100 == 0: addOn = 150; break;
                        case window.streak % 50 == 0: addOn = 42; break;
                        case window.streak % 40 == 0: addOn = 22; break;
                        case window.streak % 30 == 0: addOn = 15; break;
                        case window.streak % 20 == 0: addOn = 10; break;
                        case window.streak % 10 == 0: addOn = 5; break;
                        case window.streak % 5 == 0: addOn = 3; break;
                    }

                    if (addOn != 0) {
                        score = score + addOn;
                        cheer('heads', addOn, false, true);
                    }

                }

                $('.score').html(score+val);
                $('.tab.now, .key').addClass('hit').removeClass('now');
            break;
            case '-':
                
                if (window.streak != 0) {
                    cheer('', 0, false, true);
                }
                window.streak = 0;
                
                if (score-val >= 0) {
                    score = score-val;
                } else {
                    score = 0;
                }
                
                $('.score').html(score);
                $('.tab.now, .key').addClass('ouch').removeClass('now');
            break;
        }

    }

}



$(document).on('click touch', '.how', function(){

    var vid = $(this).attr('vid'),
        pos = {'top': $(this).offset().top+$(window).height()/100*4.2,
               'left': $(this).offset().left};

    $('body').append($('<div>')
                    .addClass('howTo center')
                    .css({display: 'none'})
                    // .css({top: pos.top, left: pos.left})
                        .append($('<video muted autoplay loop>')
                        .addClass('center')
                            .append($('<source>')
                            .attr('src', '/data/how/'+vid)
                            .attr('type', 'video/mp4'))
                        )
                        .fadeIn(250)
            );


});
$(document).on('touch click', '.howTo', function(){

    $(this).fadeOut(250, function(){$(this).remove();});

});