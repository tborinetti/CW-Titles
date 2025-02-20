var selected_display_option = "";
var change_icon_preference = false;
const config = { childList: true, subtree: true };

chrome.storage.sync.get(['display_option', 'icon_preference'], function(data) {
    selected_display_option = data.display_option;
    change_icon_preference = data.icon_preference;
});

function changeFavicon(letter) {
    const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');

    faviconLink.rel = 'icon';
    faviconLink.href = chrome.runtime.getURL(`assets/${letter}.ico`);
    
    document.head.appendChild(faviconLink);
}



// Function to handle when the 'detailLabel' element is found
function attachObserverToDetailLabel() {
    const detailLabelElement = document.getElementsByClassName("detailLabel")[0];
    if (detailLabelElement) {
        console.log("detailLabel element found. Attaching observer...");
        updateTitleFromSummary(); // Initial title update
        const detailLabelObserver = new MutationObserver(updateTitleFromSummary);
        detailLabelObserver.observe(detailLabelElement, config);
    }
}

// Function to handle when the 'GMDB3DUBLHH' element is found
function attachObserverToPodHeader() {
    const podHeaderElements = document.getElementsByClassName("cw_company")[0];
    if (podHeaderElements) {
        console.log("podheader element found. Attaching observer...");
        updateTitleFromCompany();
        const podHeaderObserver = new MutationObserver(updateTitleFromCompany);
        podHeaderObserver.observe(podHeaderElements, config);
    }
}


// Callback function for the parent observer to detect when elements are added to the DOM
function parentMutationCallback(mutationsList, parentObserver) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if the target element is now present in the DOM
            attachObserverToDetailLabel();
            attachObserverToPodHeader();
        }
    }
}

// Set up a MutationObserver on the entire document body to detect when React renders the elements
const parentObserver = new MutationObserver(parentMutationCallback);
parentObserver.observe(document.body, config);

// Update title based on 'detailLabel' content
function updateTitleFromSummary() {
    const targetElement = document.getElementsByClassName("detailLabel");
    if (selected_display_option != "summary"){
        return;
    }
    if (targetElement) {
        if (targetElement.length > 0 ){
            const title = targetElement[0].textContent
            console.log("CWTITLES: Summary found - " + targetElement[0].textContent);
    
            if (title.includes("#")){
                let summary = title.replace(/[\w\W]+#[0-9]+ - /, '');
                document.title = summary;    
                return;  
            }
        }
    }
}

// Update title based on 'GMDB3DUBLHH' content
function updateTitleFromCompany() {
    const targetElement = document.getElementsByClassName("cw_company")[0];
    if (targetElement.value) {
        let company = targetElement.value;
        if (change_icon_preference){
            const letter = company[0].toLowerCase();
            console.log(letter);
            changeFavicon(letter);
        }

        if (selected_display_option != "company"){
            return;
        }
        document.title = company;
    }

}