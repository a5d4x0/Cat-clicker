/*========== Model ==========*/
var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};
/*========= Octopus ========= */
var octopus = {
    
    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    increamentCout: function() {
        model.currentCat.clickCount ++;
        catView.render();
    },

    getCats: function() {
        return model.cats;
    }
};
/*========= View ========= */
var catView = {

    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        this.catImageElem.addEventListener('click', function() {
            octopus.increamentCout();
        });

        this.render();
    },
    
    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
       this.catListElem = document.getElementById('cat-list');
       this.render();
    },

    render: function() {
        var cats = octopus.getCats();
        var elem;
        var currentCat = octopus.getCurrentCat();
        this.catListElem.innerHTML = '';
        for(var i=0; i<cats.length; i++) {
            elem = document.createElement('li');
            elem.textContent = cats[i].name;

            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cats[i]));

            this.catListElem.appendChild(elem);
        }
        
        document.getElementById('btn-admin').addEventListener('click', (function () {
            document.getElementById('admin').style.visibility = "visible";
            document.getElementById('ad-name').value = currentCat.name;
            document.getElementById('ad-count').value = currentCat.clickCount;
            document.getElementById('ad-url').value = currentCat.imgSrc;
        }));

        document.getElementById('btn-cancel').addEventListener('click', (function () {
            document.getElementById('admin').style.visibility = "hidden";
        }));

        document.getElementById('btn-save').addEventListener('click', (function () {
            currentCat.name = document.getElementById('ad-name').value;
            currentCat.clickCount = document.getElementById('ad-count').value;
            currentCat.imgSrc = document.getElementById('ad-url').value;
            octopus.setCurrentCat(currentCat);
            catView.render();
            document.getElementById('admin').style.visibility = "hidden";
        }));
    }
};

octopus.init();