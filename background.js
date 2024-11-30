chrome.storage.sync.get(['display_option', 'icon_preference'], function(data) {
    const selected_display_option = data.display_option;
    const change_icon_preference = data.icon_preference;
    let summary = document.title;
    let company = document.title;

    const checkInterval = setInterval(function() {
        switch (selected_display_option) {
            case "summary":
                summary = searchSummary();
                if (summary) {
                    document.title = summary;
                    clearInterval(checkInterval);
                }
                break;
            case "company":
                company = searchCompany();
                if (company){
                    document.title = company;
                    clearInterval(checkInterval);
                }
                break;
            case "initials_summary":
                summary = searchSummary();
                company = searchCompany();
                if (summary && company) {
                    let company_initals = initialCompany(company);
                    document.title = company_initals + " - " + summary;
                    clearInterval(checkInterval);
                }
        }
        if (change_icon_preference) {
            changeFavicon();
        }
    }, 1000);  
});


function searchSummary() {
    const ticket_title_arr = document.getElementsByClassName("detailLabel");
    if (ticket_title_arr.length > 0 ){
        const title = ticket_title_arr[0].textContent
        console.log("CWTITLES: Summary found - " + ticket_title_arr[0].textContent);

        if (title.includes("#")){
            let summary = title.replace(/[\w\W]+#[0-9]+ - /, '');
            return summary;        
        }
        return null;
    }
}

function searchCompany() {
    const pod_headers_arr = document.getElementsByClassName("GMDB3DUBLHH");
    if (pod_headers_arr.length > 0) {
        for (let i = 0; i < pod_headers_arr.length; i++){
            if (pod_headers_arr[i].textContent.includes("Company: ")){
                company = pod_headers_arr[i].textContent.replace("Company: ", "");
                return company;
            }
        } 
        return null;
    }
}

function initialCompany(company_name){
    let company_array = company_name.split(" ");
    let initials = "";
    for (let w = 0; w < company_array.length; w++) {
        let word = company_array[w];
        let initials_count = 0;
        for (let c = 0; c < word.length; c++) {
            let char = word[c];
            if (char == char.toUpperCase()) {
                initials += char;
                initials_count++;
            }
            
        }
        if (initials_count > 1) {
            initials += " ";
        }
    }
    return initials;
}

function changeFavicon() {
    const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');

    faviconLink.rel = 'icon';
    faviconLink.href = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png";
    
    document.head.appendChild(faviconLink);
}



