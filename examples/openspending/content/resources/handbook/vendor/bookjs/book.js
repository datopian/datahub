/*!
 * BookJS v.0.23.1-dev
 * Copyright 2012  Aleksandar Erkalovic, Marita Fraser, Steven Levithan, 
 * Philip Schatz and Johannes Wilm. Freely available under the AGPL. For
 * further details see LICENSE.txt
 *
 * Using this library you can turn an HTML element into a series
 * of pages using CSS Regions. If the browser doesn't support CSS Regions,
 * everything will be flown into one large page  container that looks like a
 * very long page.
 *
 *
 * HOWTO
 *
 * In order to use this library, link to the corresponding file as well as this
 * javascript file within your html code. If you need to set custom options, 
 * set them before including this file by defining an object named 
 * paginationConfig and setting the customization options as keys within this 
 * object. Like this:
 *
 * <link href="book.css" rel="stylesheet" type="text/css" />
 * <script type="text/javascript">
 *     paginationConfig = {
 *         'sectionStartMarker': 'h3',
 *	   'columns': 3,
 *         'autoStart': false,
 *     }
 * </script>
 * <script src="book.js" type="text/javascript"></script>
 *
 * The following options are available to customize the pagination behavior. In
 * the descriptions below you can see the default values for these options. You
 * only need to specify the options if you want to deviate from the default 
 * value.
 *
 * sectionStartMarker: h1 -- This is the HTML element we look for to find where
 * a new section starts.
 *
 * sectionTitleMarker: h1 -- Within the newly found section, we look for the
 * first instance of this element to determine the title of the section.
 *
 * chapterStartMarker: h2 -- This is the HTML element we look for to find where
 * a new chapter starts.
 *
 * chapterTitleMarker: h2 -- Within the newly found chapter, we look for the
 * first instance of this element to determine the title of the chapter.
 *
 * flowElement: document.body -- This specifies element the container element
 * of the content we will flow into pages. You can use any javascript selector
 * here, such as "document.getElementById('contents')" .
 * 
 * alwaysEven: false -- This determines whether each section and chapter should
 * have an even number of pages (2, 4, 6, 8, ...).
 *
 * columns: 1 -- This specifies the number of number of columns used for the
 * body text. 
 * 
 * enableFrontmatter: true -- This resolves whether a table of contents, page\
 * headers and other frontmatter contents should be added upon page creation.
 *
 * bulkPagesToAdd: 50 -- This is the initial number of pages of each flowable
 * part (section, chapter). After this number is added, adjustments are made by
 * adding another bulk of pages or deletin pages individually. It takes much 
 * less time to delete pages than to add them individually, so it is a point to
 * overshoot the target value. For larger chapters add many pages at a time so 
 * there is less time spent reflowing text.
 *
 * pagesToAddIncrementRatio: 1.4 -- This is the ratio of how the bulk of pages 
 * incremented. If the initial bulkPagestoAdd is 50 and those initial 50 pages
 * were not enough space to fit the contents of that chapter, then next
 * 1.4 * 50 = 70 are pages, for a total of 50+70 = 120 pages, etc. .  1.4 seems
 * to be the fastest in most situations.
 *
 * frontmatterContents: none -- These are the HTML contents that are added to
 * the frontmatter before the table of contents. This would usually be a title 
 * page and a copyright page, including page breaks.
 *
 * autoStart: true -- This controls whether pagination should be executed 
 * automatically upon page load. If it is set to false, pagination has to be
 * initiated manually by calling Pagination.applyBookLayout() or 
 * Pagination.applySimpleBookLayout() in case CSS Regions are not present. 
 * Check Pagination._cssRegionCheck() to see if CSS Regions are present.
 */
/*
 * The Pagination object represents all the pagination functionality which is
 * added to its namespace.
 */
var Pagination = new Object;

Pagination.config = {
    'sectionStartMarker': 'h1',
        'sectionTitleMarker': 'h1',
        'chapterStartMarker': 'h2',
        'chapterTitleMarker': 'h2',
        'flowElement': 'document.body',
        'alwaysEven': false,
        'columns': 1,
        'enableFrontmatter': true,
        'bulkPagesToAdd': 50,
        'pagesToAddIncreementRatio': 1.4,
        'frontmatterContents': '',
        'autoStart': true
};

Pagination.initiate = function () {
    this.userConfigImport();
    this.setStyle();
}

Pagination.userConfigImport = function () {
    if (window.paginationConfig) {
        for (var key in paginationConfig) {
            Pagination.config[key] = paginationConfig[key];
        }
    }
}

Pagination.setStyle = function () {
    var stylesheet = document.createElement('style');
    stylesheet.innerHTML = ".contentsContainer {display: -webkit-box; -webkit-box-orient: vertical;}" + " .contents {display: -webkit-box; -webkit-box-flex: 1}" + " .contents-column {-webkit-box-flex: 1}" + " .footnotes .invisible {visibility: hidden}" + " #contents .footnote {display: none}";
    document.head.appendChild(stylesheet);
}

Pagination.romanize = function () {
    // Create roman numeral representations of numbers.
    var digits = String(+this.value).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
};

Pagination.pageCounterCreator = function (selector, show) {
    this.selector = selector;
    if (show !== undefined) {
        this.show = show;
    }
};

Pagination.pageCounterCreator.prototype.value = 0;

Pagination.pageCounterCreator.prototype.needsUpdate = false;

Pagination.pageCounterCreator.prototype.show = function () {
    return this.value;
};

Pagination.pageCounterCreator.prototype.incrementAndShow = function () {
    this.value++;
    return this.show();
};


Pagination.pageCounterCreator.prototype.numberPages = function () {
    if (this.needsUpdate) {
        this.value = 0;
        this.needsUpdate = false;

        var pagenumbersToNumber = document.querySelectorAll('.page .pagenumber.' + this.selector);
        for (var i = 0; i < pagenumbersToNumber.length; i++) {
            pagenumbersToNumber[i].innerHTML = this.incrementAndShow();
        }
    }
};

Pagination.pageCounters = {};

Pagination.pageCounters.arab = new Pagination.pageCounterCreator('arabic');
Pagination.pageCounters.roman = new Pagination.pageCounterCreator('roman', Pagination.romanize);

Pagination.createPages = function (num, flowName, pageCounterSelector, columns) {
    // Create the DOM structure of each page.
    var page, contents, footnotes, contentsContainer, column, topFloats;
    var tempRoot = document.createDocumentFragment();
    for (var i = 0; i < num; i++) {
        page = document.createElement('div');
        page.classList.add('page');

        header = document.createElement('div');
        header.classList.add('header');

        chapterheader = document.createElement('span');
        chapterheader.classList.add('chapter');
        header.appendChild(chapterheader);

        sectionheader = document.createElement('span');
        sectionheader.classList.add('section');
        header.appendChild(sectionheader);

        page.appendChild(header);

        pagenumberfield = document.createElement('div');
        pagenumberfield.classList.add('pagenumber');
        pagenumberfield.classList.add(pageCounterSelector);

        page.appendChild(pagenumberfield);

        // If flowName is given, create a page with content flow.
        if (flowName) {
            contentsContainer = document.createElement('div');
            contentsContainer.classList.add('contentsContainer');

            topFloats = document.createElement('div');
            topFloats.classList.add('topFloats');

            contents = document.createElement('div');
            contents.classList.add('contents');

            for (var j = 0; j < columns; j++) {
                column = document.createElement('div');
                column.classList.add('contents-column');
                contents.appendChild(column);
            }

            footnotes = document.createElement('div');
            footnotes.classList.add('footnotes');

            contentsContainer.appendChild(topFloats);
            contentsContainer.appendChild(contents);
            contentsContainer.appendChild(footnotes);
            page.appendChild(contentsContainer);
            // If no flowName is given, an empty page is created.
        } else {
            page.classList.add('empty');
        }

        tempRoot.appendChild(page);
    }
    return tempRoot;
};

Pagination.events = {};

Pagination.events.bodyLayoutUpdated = document.createEvent('Event');

Pagination.events.bodyLayoutUpdated.initEvent('bodyLayoutUpdated', true, true);

Pagination.events.layoutFlowFinished = document.createEvent('Event');

Pagination.events.layoutFlowFinished.initEvent('layoutFlowFinished', true, true);

Pagination.events.pageLayoutUpdate = document.createEvent('Event');

Pagination.events.pageLayoutUpdate.initEvent('pageLayoutUpdated', true, true);

Pagination.events.footnotesNeedMove = document.createEvent('Event');

Pagination.events.footnotesNeedMove.initEvent('footnotesNeedMove', true, true);

Pagination.headersAndToc = function (bodyObjects) {

    var currentChapterTitle = '';
    var currentSectionTitle = '';

    var tocDiv = document.createElement('div');
    tocDiv.id = 'toc';

    tocTitleDiv = document.createElement('div');
    tocTitleDiv.id = 'toc-title';

    tocDiv.appendChild(tocTitleDiv);



    for (var i = 0; i < bodyObjects.length; i++) {
        bodyObjects[i].findTitle();
        bodyObjects[i].findStartpageNumber();

        if (bodyObjects[i].type == 'chapter') {
            currentChapterTitle = bodyObjects[i].title;
        } else if (bodyObjects[i].type == 'section') {
            currentSectionTitle = bodyObjects[i].title;
        }
        var pages = bodyObjects[i].div.childNodes;

        for (var j = 0; j < pages.length; j++) {
            var chapterHeader = pages[j].querySelector('.header .chapter');
            chapterHeader.innerHTML = currentChapterTitle;

            var sectionHeader = pages[j].querySelector('.header .section');
            sectionHeader.innerHTML = currentSectionTitle;
        }

        if (bodyObjects[i].type) {

            var tocItemDiv = document.createElement('div');
            tocItemDiv.classList.add('toc-entry');
            tocItemDiv.classList.add(bodyObjects[i].type);

            var tocItemTextSpan = document.createElement('span');
            tocItemTextSpan.classList.add('toc-text');

            tocItemTextSpan.innerHTML = bodyObjects[i].title;
            tocItemDiv.appendChild(tocItemTextSpan);

            var tocItemPnSpan = document.createElement('span');
            tocItemPnSpan.classList.add('toc-pagenumber');

            if (typeof bodyObjects[i].startpageNumber !== 'undefined') {
                var tocItemPnText = document.createTextNode(bodyObjects[i].startpageNumber);
                tocItemPnSpan.appendChild(tocItemPnText);
            }

            tocItemDiv.appendChild(tocItemPnSpan);

            tocDiv.appendChild(tocItemDiv);

        }

    }

    return tocDiv;
};

/**
 * Creates objects for each item in the body (section start, chapter)
 */

Pagination.createBodyObjects = function () {
    //    
    var bodyObjects = [];
    var chapterCounter = 0;

    bodyObjects.push(new Pagination.flowObject('bodypre', Pagination.pageCounters.arab));

    var bodyContainer = eval(Pagination.config.flowElement);
    var bodyContents = bodyContainer.childNodes;


    for (var i = bodyContents.length; i > 0; i--) {

        if (bodyContents[0].nodeType == 1) {
            if (bodyContents[0].webkitMatchesSelector(Pagination.config.chapterStartMarker)) {
                bodyObjects.push(new Pagination.flowObject('body' + chapterCounter++, Pagination.pageCounters.arab));
                bodyObjects[chapterCounter].setType('chapter');

            } else if (bodyContents[0].webkitMatchesSelector(Pagination.config.sectionStartMarker)) {
                bodyObjects.push(new Pagination.flowObject('body' + chapterCounter++, Pagination.pageCounters.arab));
                bodyObjects[chapterCounter].setType('section');
            }
        }

        bodyObjects[chapterCounter].rawdiv.appendChild(bodyContents[0]);
    }

    return bodyObjects;

};

Pagination.applyBookLayout = function () {

    var bodyObjects = Pagination.createBodyObjects();

    //Create div for layout
    var layoutDiv = document.createElement('div');
    layoutDiv.id = 'layout';
    document.body.appendChild(layoutDiv);

    //Create div for contents
    var contentsDiv = document.createElement('div');
    contentsDiv.id = 'contents';
    document.body.appendChild(contentsDiv);

    counter = 0;

    for (var i = 0; i < bodyObjects.length; i++) {
        layoutDiv.appendChild(bodyObjects[i].div);
        contentsDiv.appendChild(bodyObjects[i].rawdiv);
        bodyObjects[i].initiate();
    }

    Pagination.pageCounters.arab.numberPages();

    if (Pagination.config.enableFrontmatter) {
        //Create and flow frontmatter
        fmObject = new Pagination.flowObject('frontmatter', Pagination.pageCounters.roman, 1);
        fmObject.columns = 1;
        contentsDiv.insertBefore(fmObject.rawdiv, contentsDiv.firstChild);
        fmObject.rawdiv.innerHTML = Pagination.config.frontmatterContents;
        var toc = Pagination.headersAndToc(bodyObjects);
        fmObject.rawdiv.appendChild(toc);
        layoutDiv.insertBefore(fmObject.div, bodyObjects[0].div);
        fmObject.initiate();
        var redoToc = function () {
            var oldToc = toc;
            toc = Pagination.headersAndToc(bodyObjects);
            fmObject.rawdiv.replaceChild(toc, oldToc);
        };
        document.body.addEventListener('bodyLayoutUpdated', redoToc);
    }
    document.dispatchEvent(Pagination.events.layoutFlowFinished);
};



Pagination.applySimpleBookLayout = function () {
    // Apply this alternative layout in case CSS Regions are not present 
    bodyContainer = eval(Pagination.config.flowElement);
    simplePage = document.createElement('div');
    simplePage.classList.add('page');
    simplePage.classList.add('simple');
    simplePage.innerHTML = bodyContainer.innerHTML;
    simplePage.id = bodyContainer.id;
    bodyContainer.innerHTML = '';
    document.body.appendChild(simplePage);
};

Pagination._cssRegionsCheck = function () {
    // Check whether CSS Regions are present in Chrome 23+ version
    if ((document.webkitGetNamedFlows) && (document.webkitGetNamedFlows() !== null)) {
        return true;
    }
    return false;
};

Pagination.autoStartInitiator = function () {
    // To be executed upon document loading.
    var cssRegionsPresent = Pagination._cssRegionsCheck();
    if ((document.readyState == 'interactive') && (!(cssRegionsPresent))) {
        Pagination.applySimpleBookLayout();
    } else if ((document.readyState == 'complete') && (cssRegionsPresent)) {
        Pagination.applyBookLayout();
    }
}



Pagination.flowObject = function (name, pageCounter) {
    this.name = name;
    this.pageCounter = pageCounter;

    this.rawdiv = document.createElement('div');
    this.rawdiv.id = name + 'raw';

    this.div = document.createElement('div');
    this.div.id = name;

    this.bulkPagesToAdd = Pagination.config.bulkPagesToAdd;

    this.columns = Pagination.config.columns;

    this.footnotes = [];
};

Pagination.flowObject.prototype.totalPages = 0;

Pagination.flowObject.prototype.redoPages = false;

Pagination.flowObject.prototype.overset = false;

Pagination.flowObject.prototype.firstEmptyRegionIndex = -1;

Pagination.flowObject.prototype.initiate = function () {
    this.setStyle();
    this.namedFlow = document.webkitGetNamedFlows()[this.name];
    this.addOrRemovePages();
    this.setupReflow();
    this.findAllFootnotes();
    this.addFootnoteReferences();
    this.layoutFootnotes();
    this.setupFootnoteReflow();
    this.pageCounter.numberPages();
}

Pagination.flowObject.prototype.setStyle = function () {
    var stylesheet = document.createElement('style');
    stylesheet.innerHTML = "#" + this.name + " .contents-column {-webkit-flow-from:" + this.name + ";}" + " #" + this.name + "raw {-webkit-flow-into:" + this.name + ";}";
    document.head.appendChild(stylesheet);
}

Pagination.flowObject.prototype.setType = function (type) {
    this.type = type;
    this.div.classList.add(type);
};

Pagination.flowObject.prototype.findTitle = function () {
    var titleField;
    if (this.type == 'chapter') {
        titleField = this.rawdiv.querySelector(Pagination.config.chapterTitleMarker);
        this.title = titleField.innerHTML;
    } else if (this.type == 'section') {
        titleField = this.rawdiv.querySelector(Pagination.config.sectionTitleMarker);
        this.title = titleField.innerHTML;
    }
};

Pagination.flowObject.prototype.findStartpageNumber = function () {
    if (this.rawdiv.innerText.length > 0) {
        var startpageNumberField = this.div.querySelector('.pagenumber');
        this.startpageNumber = startpageNumberField.innerText;
    }
};

Pagination.flowObject.prototype.findFootnoteReferencePage = function (footnoteReference) {
    return this.namedFlow.getRegionsByContent(footnoteReference)[0].parentNode.parentNode.parentNode;
}

Pagination.flowObject.prototype.findFootnotePage = function (footnote) {
    return footnote.parentNode.parentNode.parentNode;
}

Pagination.flowObject.prototype.compareReferenceAndFootnotePage = function (footnoteObject) {
    // Check whether a footnote and it's corresponding reference in the text are on the same page.
    var referencePage = this.findFootnoteReferencePage(footnoteObject['reference']);
    var footnotePage = this.findFootnotePage(footnoteObject['item']);

    if (footnotePage === referencePage) {
        return true;
    } else {
        return false;
    }
}


Pagination.flowObject.prototype.setupFootnoteReflow = function () {
    var flowObject = this;

    var checkAllFootnotePlacements = function () {
        flowObject.checkAllFootnotePlacements();
    }

    this.namedFlow.addEventListener('webkitRegionLayoutUpdate', checkAllFootnotePlacements);

    var reFlow = function () {
        flowObject.namedFlow.removeEventListener('webkitRegionLayoutUpdate', checkAllFootnotePlacements);

        flowObject.layoutFootnotes();

        flowObject.namedFlow.addEventListener('webkitRegionLayoutUpdate', checkAllFootnotePlacements);
    }

    this.namedFlow.addEventListener('footnotesNeedMove', reFlow);
}

Pagination.flowObject.prototype.checkAllFootnotePlacements = function () {
    for (var i = 0; i < this.footnotes.length; i++) {
        if (!(this.compareReferenceAndFootnotePage(this.footnotes[i]))) {
            this.namedFlow.dispatchEvent(Pagination.events.footnotesNeedMove);
        }
    }
}

Pagination.flowObject.prototype.findAllFootnotes = function () {
    var allFootnotes = this.rawdiv.getElementsByClassName('footnote'); // Look for all the items that have "footnote" in their class list. These will be treated as footnote texts.
    for (var i = 0; i < allFootnotes.length; i++) {
        var footnoteObject = {}; // We create this object so that we can find the footnote item and reference again later on.

        footnoteObject['original'] = allFootnotes[i];

        var numFootnote = document.createElement('sup'); // Create a sup-element with the class "footnote-reference" that holds the current footnote number. This will be used both in the body text and in the footnote itself.
        numFootnote.classList.add('footnote-reference');
        numFootnoteContents = document.createTextNode(i + 1);
        numFootnote.appendChild(numFootnoteContents);

        var footnote = document.createElement('div'); // Put the footnote number and footnote text together in a div-element with the class footnote-item
        footnote.classList.add('footnote-item');
        footnote.classList.add('visible');
        footnote.appendChild(numFootnote);

        var footnoteText = allFootnotes[i].cloneNode(true);
        footnote.appendChild(footnoteText);

        footnoteObject['item'] = footnote;

        numFootnoteReference = numFootnote.cloneNode(true);

        footnoteObject['reference'] = numFootnoteReference;

        this.footnotes.push(footnoteObject);
    }
}

Pagination.flowObject.prototype.addFootnoteReferences = function () {
    for (var i = 0; i < this.footnotes.length; i++) {
        this.footnotes[i]['original'].parentNode.insertBefore(this.footnotes[i]['reference'], this.footnotes[i]['original']); // Insert the footnote number in the body text just before the original footnote text appears).
    }
}

Pagination.flowObject.prototype.layoutFootnotes = function () {
    for (var i = 0; i < this.footnotes.length; i++) {

        if ('hidden' in this.footnotes[i]) {
            this.footnotes[i]['hidden'].parentNode.removeChild(this.footnotes[i]['hidden']);
            delete this.footnotes[i]['hidden'];
        }

        var footnoteReferencePage = this.findFootnoteReferencePage(this.footnotes[i]['reference']); // We find the page where the footnote is referenced from.
        var currentFootnoteContainer = footnoteReferencePage.querySelector('.footnotes');
        currentFootnoteContainer.appendChild(this.footnotes[i]['item']); // We insert the footnote in the footnote container of that page.

        if (!(this.compareReferenceAndFootnotePage(this.footnotes[i]))) {
            // If the footnote reference has been moved from one page to another through the insertion procedure, we set the visibility of the footnote to "hidden" so that it continues to take up the same space and then insert it one more time on the page from where it now is referenced.
            this.footnotes[i]['hidden'] = this.footnotes[i]['item'];
            this.footnotes[i]['item'] = this.footnotes[i]['hidden'].cloneNode(true);

            this.footnotes[i]['hidden'].classList.remove('visible');
            this.footnotes[i]['hidden'].classList.add('invisible');

            footnoteReferencePage = this.findFootnoteReferencePage(this.footnotes[i]['reference']); // We find the page where the footnote is referenced from now.
            currentFootnoteContainer = footnoteReferencePage.querySelector('.footnotes');
            currentFootnoteContainer.appendChild(this.footnotes[i]['item']);
        }
    }
};

Pagination.flowObject.prototype.makeEvenPages = function () {
    var emptyPage = this.div.querySelector('.page.empty');
    if (emptyPage) {
        this.div.removeChild(emptyPage);
    }
    var allPages = this.div.querySelectorAll('.page');
    if (allPages.length % 2 == 1) {
        this.div.appendChild(Pagination.createPages(1, false, this.pageCounter.selector, this.columns));
    }
};

Pagination.flowObject.prototype.addPagesLoop = function (pages) {

    if ('undefined' === typeof (pages)) {
        this.totalPages += this.bulkPagesToAdd;
        this.div.appendChild(Pagination.createPages(this.bulkPagesToAdd, this.name, this.pageCounter.selector, this.columns));
        this.bulkPagesToAdd = Math.floor(this.bulkPagesToAdd * Pagination.config.pagesToAddIncrementRatio);
    } else {
        this.totalPages += pages;
        this.div.appendChild(Pagination.createPages(pages, this.name, this.pageCounter.selector, this.columns));
    }
    this.addOrRemovePages(pages);
};


Pagination.flowObject.prototype.addOrRemovePages = function (pages) {

    if ((this.namedFlow.overset) && (this.rawdiv.innerText.length > 0)) {
        this.pageCounter.needsUpdate = true;
        this.redoPages = true;
        this.addPagesLoop(pages);
    } else if ((this.namedFlow.firstEmptyRegionIndex != -1) && ((this.totalPages * this.columns - this.namedFlow.firstEmptyRegionIndex) > this.columns)) {
        this.redoPages = true;
        this.removeExcessPages(pages);
    } else if (this.redoPages) {
        this.redoPages = false;
        if (Pagination.config.alwaysEven) {
            this.makeEvenPages();
        }
        if (this.name != 'frontmatter') {
            document.body.dispatchEvent(Pagination.events.bodyLayoutUpdated);
        }
    }
};


Pagination.flowObject.prototype.removeExcessPages = function (pages) {

    var allPages = this.div.querySelectorAll('.page');

    for (var i = (Math.ceil(this.namedFlow.firstEmptyRegionIndex / this.columns)); i < allPages.length; i++) {
        this.div.removeChild(allPages[i]);
        this.totalPages--;
    }
    this.addOrRemovePages(pages);
};


Pagination.flowObject.prototype.setupReflow = function () {
    var flowObject = this;

    var checkOverset = function () {
        // Something has changed in the contents of this flow. Check if the overset has changed, and if it has, emit a pageLayoutUpdate event. 
        if ((flowObject.namedFlow.overset !== flowObject.overset) || (flowObject.namedFlow.firstEmptyRegionIndex !== flowObject.firstEmptyRegionIndex)) {
            flowObject.overset = flowObject.namedFlow.overset;
            flowObject.firstEmptyRegionIndex = flowObject.namedFlow.firstEmptyRegionIndex;
            flowObject.namedFlow.dispatchEvent(Pagination.events.pageLayoutUpdate);
        }
    }
    this.namedFlow.addEventListener('webkitRegionLayoutUpdate', checkOverset);

    var reFlow = function () {
        // The page layout has changed. Reflow by adding pages one by one.
        flowObject.addOrRemovePages(1);
        flowObject.pageCounter.numberPages();
    };
    this.namedFlow.addEventListener('pageLayoutUpdated', reFlow);

};



Pagination.initiate();

if (Pagination.config.autoStart === true) {
    // Hook Pagination.autoStartInitiator to document loading stage if 
    document.addEventListener("readystatechange", Pagination.autoStartInitiator);
}
