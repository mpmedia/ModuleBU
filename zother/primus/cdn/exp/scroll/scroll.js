var storage = {
    getObject: function (obj) {
        return JSON.parse(localStorage.getItem(obj));
    },
    saveObject: function (obj, val) {
        localStorage.setItem(obj, JSON.stringify(val));
    },
    deleteObject: function (obj) {
        localStorage.removeItem(obj);
    }
};

var Dimensions = function () {
        this.itemsToRemove = 40;
        this.offsetBeforeRemoving = 1000;
        this.batchSize = 99;
};

var Scroller = function(batchSize, holder, pane) {
    this.holder = holder,
    this.pane = pane,
    this.currentlyAt = 0,
        this.gap = 0,
        this.scrollPosition = 0,
        this.totalLoaded = 0,
        this.objectCounter = 0,
        this.considerFastDrag = true,
        this.newItems = {},
        this.oldScroll = 0,
        this.hashHitsCount = 0,
        this.stackHitsCount = 0,
        offsets = new Dimensions(),
        this.size = offsets.batchSize || batchSize;
    }

    Scroller.prototype.resetStatics = function () {
            Scroller.isFingerDown = false,
            Scroller.highestScrolledTo = Scroller.blanked = Scroller.oldScroll = Scroller.previouslyAt =
                Scroller.imageTapper = Scroller.hashLoader = Scroller.imageRemover = 0;
    }

    Scroller.prototype.init = function() {
        storage.deleteObject("imageStack");
        storage.deleteObject("rangeHash");
        this.resetStatics();
        this.load();
        var outer = this;
        this.holder.addEventListener("scroll", (function(e){outer.refreshPane(e);}));
    }

    Scroller.prototype.refreshPane = function (e) {
        this.currentlyAt = currentlyAt = e.target.scrollTop;
        var restored = false;
        var considerFastDrag = true;
        this.removeItems(currentlyAt);
        if (currentlyAt >= Scroller.previouslyAt) {
            if (currentlyAt > 0 && currentlyAt > this.scrollPosition && currentlyAt >= Scroller.highestScrolledTo &&
              this.holder.scrollHeight - currentlyAt < 1000 && currentlyAt - this.scrollPosition >= 250 && !Scroller.busy) {
                Scroller.busy = true;
                this.load(e);//more items
                considerFastDrag = false;
            }
        }
        else
        {
                this.restoreItems(currentlyAt); //Stack lookups
                restored = true;

                if (Math.abs(currentlyAt - Scroller.previouslyAt) > 200)
                    restored = false;

                if (considerFastDrag && Scroller.highestScrolledTo > currentlyAt && !restored)
                    this.restoreItemsFromHash(currentlyAt); //Hash lookups
        }
            Scroller.previouslyAt = currentlyAt;
        Scroller.highestScrolledTo = Math.max(currentlyAt, Scroller.highestScrolledTo); 
    };


    Scroller.prototype.restoreItemsFromHash = function (currentlyAt) {
        var range = this.getRangeFor(currentlyAt),
            dirty = false,
            spannedRange = [range[0] - 1000 + "-" + range[0], range[0] + "-" + range[1], range[1] + "-" + (range[1] + 1000)],
            rangeHash = storage.getObject("rangeHash"),
            rangeItem, unseenItems, div;
            if (rangeHash) {
                for (rangeItem in spannedRange) {
                    unseenItems = rangeHash[spannedRange[rangeItem]];
                    for (div in unseenItems) {
                        if (document.getElementById(div).firstChild.src.indexOf("php") == -1)
                            document.getElementById(div).firstChild.src = unseenItems[div];
                    }
                    if(rangeHash[spannedRange[rangeItem]] != null)
                        delete rangeHash[spannedRange[rangeItem]][unseenItems[div]];
                    dirty = true;
                }
                if (dirty)
                    storage.saveObject("rangeHash", rangeHash);

                rangeHash = null
        }
    };

    Scroller.prototype.restoreItems = function (currentlyAt) {
        var dims = offsets, i, stack, j, item, odiv, range;
        console.log("Old "+Scroller.oldScroll + ", Currently "+currentlyAt);;

        if (Scroller.oldScroll - currentlyAt > dims.offsetBeforeRemoving / 2 && currentlyAt < Scroller.oldScroll || currentlyAt < 200) {
            if (i = Scroller.blanked, stack = storage.getObject("imageStack"), stack && stack.length) {
                var itemsToRestore = dims.itemsToRemove;
                console.log("Restoring from stack");
                rangeHash = storage.getObject("rangeHash");
                for (j = 0; j < itemsToRestore; j++, i--) {
                    item = stack.pop();
                    if (item && item.length > 0) {
                        odiv = document.getElementById(item[0]);
                        if (odiv && odiv.firstChild.src.indexOf("php") == -1)
                            odiv.firstChild.src = item[1];

                        //Update hash
                        range = this.getRangeFor(odiv.offsetTop).join("-");
                        if (rangeHash && rangeHash[range][item[0]])
                            delete rangeHash[range][item[0]];
                    }
                }

                Scroller.blanked = i;;
                storage.saveObject("imageStack", stack);
                if (rangeHash) storage.saveObject("rangeHash", rangeHash);

                stack = null, rangeHash = null;

                Scroller.oldScroll = Math.min(Scroller.oldScroll, currentlyAt)
            }
            this.scrollPosition -= Math.abs(Scroller.previouslyAt - currentlyAt)
        }
    };
		

    Scroller.prototype.getRangeFor = function (currentPosition) {
        var lowerEnd = Math.floor(currentPosition / 1000) * 1000,
            highEnd = Math.ceil(currentPosition / 1000) * 1000;
        highEnd = highEnd == 0 ? 1000 : highEnd;
        return [lowerEnd, highEnd];
    };

    Scroller.prototype.removeItems = function (currentlyAt) {
        var dims = offsets;
        var paneElements = this.pane.children;
        var lastItemOffsetTop = paneElements[Scroller.blanked].offsetTop; 
        var d, dOffsetTop, assocItem, range, block, imageElement,i;
        console.log("removing ");
        if (this.pane.hasChildNodes() && !(Scroller.blanked > 0 && this.scrollPosition == 0))
        {
            if(currentlyAt - this.scrollPosition > dims.offsetBeforeRemoving &&
                currentlyAt > Scroller.oldScroll &&
                currentlyAt - lastItemOffsetTop > dims.offsetBeforeRemoving)
            {

                var stack       = storage.getObject("imageStack") || [];
                var rangeHash = storage.getObject("rangeHash") || {};
                for (i = 0; i < dims.itemsToRemove; i++) {
                    d = paneElements[Scroller.blanked + i];
                    if (d && d.firstChild && (d.offsetTop + d.offsetHeight) < currentlyAt) // means it's behind the viewable area
                    {
                        assocItem = [d.id, d.firstChild.src];
                        stack.push(assocItem);

                        //prepare the hash
                        range = this.getRangeFor(d.offsetTop).join("-"),
                        block = rangeHash[range] || {};
                        rangeHash[range] = block;
                        imageElement = d.firstChild;
                        rangeHash[range][d.id] = imageElement.src;
                        d.firstChild.src = "";//remove
                    }
                }
                Scroller.blanked += i;
                storage.saveObject("imageStack", stack);
                storage.saveObject("rangeHash", rangeHash);
                Scroller.oldScroll = Math.max(Scroller.oldScroll, currentlyAt);

            }
        }

        console.log("Old scroll " + Scroller.oldScroll);
    };

    Scroller.prototype.load = function (e) {
        var d = document.getElementById("pane");
        for (var i = 1; i < this.size; i++) {
            var odiv = document.createElement("div");
            odiv.setAttribute("id", "h" + this.objectCounter++);
            var img = new Image();
            img.src = "a.php?" + new Date().getMilliseconds();
            odiv.appendChild(img);
            d.appendChild(odiv);
        }
        Scroller.busy = false;
        this.scrollPosition = this.currentlyAt;
    }

var scr = new Scroller(70,document.getElementById("holder"),document.getElementById("pane"));
scr.init();