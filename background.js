const checkInterval = setInterval(function() {
    console.log("CWTITLES: Searching for Tag");
    const ticket_title = document.getElementsByClassName("detailLabel");
    
    if (ticket_title.length > 0) {
        const title = ticket_title[0].textContent
        console.log("CWTITLES: Tag found - " + ticket_title[0].textContent);
        if (title.includes("#")){
            var trimmed_title = title.replace(/[\w\W]+#[0-9]+ - /, '');

            // If we find the element, update the title and stop polling
            document.title = trimmed_title;
            title_change()
            changeFavicon();
            clearInterval(checkInterval); // Stop checking once we have the element
        }
        
    }
}, 1000);  // Check every 1 second (adjust as necessary)

// option to prefix with company name
// use regex to find pod_service_ticket_company_header 
// if company name is more than 15 chars, use initials


function changeFavicon() {
    const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');

    faviconLink.rel = 'icon';
    faviconLink.href = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png";
    
    document.head.appendChild(faviconLink);
}


function title_change() {
    chrome.storage.sync.get(['display_option', 'icon_preference'], function(data) {
        const selected_display_option = data.display_option;
        const change_icon_preference = data.icon_preference;

        

        switch (selected_display_option){
            case "summary":
                
                break;
            case "company":
                break;
            case "initals_summary":
                break;
        }


    });
}
  


