import React, { useEffect, useState } from 'react';

const TitleUpdater = () => {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      console.log("CWTITLES: Searching for Tag");
      const ticketTitleElements = document.getElementsByClassName("detailLabel");

      if (ticketTitleElements.length > 0) {
        const ticketTitle = ticketTitleElements[0].textContent;
        console.log("CWTITLES: Tag found - " + ticketTitle);

        if (ticketTitle.includes("#")) {
          const trimmedTitle = ticketTitle.replace(/[\w\W]+#[0-9]+ - /, '');
          setTitle(trimmedTitle);
          clearInterval(checkInterval); // Stop checking once we have the element
        }
      }
    }, 1000); // Check every 1 second (adjust as necessary)

    return () => clearInterval(checkInterval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; // This component doesn't render anything
};

export default TitleUpdater;