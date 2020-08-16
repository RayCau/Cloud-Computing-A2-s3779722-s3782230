function getSentimentMagnitude(text, callback) {
    const url = 'https://us-central1-a2-cc-proj.cloudfunctions.net/getSentiment';
    const textToBeAnalysed = text;

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({message: textToBeAnalysed}) // body data type must match "Content-Type" header
    }).then(response => {
        return response.json();

    }).then(data => {
        return callback(data);
    })
}

function getBigQueryRedditTitles() {
    // const url = `https://us-central1-a2-cc-proj.cloudfunctions.net/getBigQueryRedditTitles?year=${2015}&title=${title}&blah=${blah}`
    document.getElementById("loadingImage").src="images/loading_circle.gif";
    const search = document.getElementById("searchpost").value;   
    const year =  document.getElementById("year").value;
    const month = document.getElementById("month").value;

    const url = `https://us-central1-a2-cc-proj.cloudfunctions.net/getBigQueryRedditTitles?search=${search}&year=${year}&month=${month}`;
    //const url = `https://us-central1-a2-cc-proj.cloudfunctions.net/getBigQueryRedditTitles`
    fetch(url, {
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url            
    }).then(response => {
        return response.json();
    }).then(data => {
        let i;
        document.getElementById("results").innerHTML = "";

        if(data.rows.length > 0) {
            for (i = 0; i < data.rows.length; i++) {
                const row = data.rows[i];
                const analysis = getSentimentMagnitude(data.rows[i].toString(), (data) => {
                console.log("Analysis: " + data.sentiment.magnitude);
                const magnitude = data.sentiment.magnitude.toFixed(2);
                const score = data.sentiment.score.toFixed(2);
    
    
                const scoreParagraph = "<p2 class = \"score\">" + score + "</p2>";
                const magnitudeParagraph = "<p2 class = \"magnitude\">" + magnitude + "</p2>"
                const postTitleParagraph = "<p class = \"postTitle\">" + "<b>Post Title:</b> " + row + "</p>"
    
                const scoreHead = "<p1 class=\"scoreHead\">Score</p1> <br>";
                const magnitudeHead = "<p1 class=\"magnitudeHead\">Magnitude</p1> <br>";
    
                const addReportButton = "<input type=\"button\" id=\"submitReport\" value=\"Submit Sentiment Analysis Report\" onclick=\"addSentimentReportToDatastore('"+row+"','"+score+"','"+magnitude+"');\"/>";
    
                const resultTable = "<table class=\"resultTable\">" + 
                    "<tr>" + 
                        "<td class = \"analysis\">" + 
                                scoreHead + scoreParagraph + 
                        "<td class = \"analysis\">" + 
                                magnitudeHead + magnitudeParagraph + 
                    "</tr>" +                     
                    "<tr>" +
                        "<td colspan=\"2\"  class = \"submitReportButton\">" +
                        addReportButton +
                        "</td>" 
                    "</tr>" 
                    "</table>";
    
                document.getElementById("results").innerHTML += "<div class=\"result\">" + postTitleParagraph + resultTable + "</div> <br>";
                });
            }
        } else {
            document.getElementById("results").innerHTML += "<h2 class=\"noResult\">  Sorry, no search results were found. </h2> <br>";
        }
        
        console.log("REDDIT DATA: ", data);
        document.getElementById("loadingImage").src="";
    })
}

function addSentimentReportToDatastore(title, magnitude, score) {
    const url = 'https://us-central1-a2-cc-proj.cloudfunctions.net/addEntityToDatastore';
    const sentimentTitle = title;
    const sentimentMagnitude = magnitude;
    const sentimentScore = score;
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({title: sentimentTitle, score: sentimentScore, magnitude: sentimentMagnitude}) // body data type must match "Content-Type" header
    }).then(response => {
        return response.json();

    }).then(data => {
        //return callback(data);
    })

    alert("Your report has been submitted to the sentiment report bulletin board. It may take a few minutes for it to appear.");
}

function getEntityFromDatastore() {
// const url = `https://us-central1-a2-cc-proj.cloudfunctions.net/getBigQueryRedditTitles?year=${2015}&title=${title}&blah=${blah}`

//const search = document.getElementById("searchpost").value;
    var img_array = ['images/loading_circle.gif', 
    'images/refresh_button.png'];

    //LOADING GIF
    document.getElementById("bulletinRefresh").src = img_array[0];
    const url = `https://us-central1-a2-cc-proj.cloudfunctions.net/getEntityFromDatabase`;
    fetch(url, {
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url            
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log("Reports: ", data);
        let i;
        //document.getElementById("results").innerHTML = "<div id = \"results\"> </div>";
        document.getElementById("sentimentReports").innerHTML = "<div id = \"sentimentReports\"> </div>";

        for (i = 0; i < data.length; i++) {
            const title = data[i].Title;
            const score = data[i].Score;
            const magnitude = data[i].Magnitude;

            const titleParagraph = "<p class = \"reportParagraph\">" + "Title: " + title + "</p>";
            const scoreParagraph = "<p class = \"reportParagraph\">" + "Score: " + score + "</p>";
            const magnitudeParagraph = "<p class = \"reportParagraph\">" + "Magnitude: " + magnitude + "</p>";



            //document.getElementById("results").innerHTML += "<div class=\"result\">" + postTitleParagraph + resultTable + "</div> <br>";
            if(data[i].Id != 0) {
                document.getElementById("sentimentReports").innerHTML += "<div class=\"report\">" + titleParagraph + scoreParagraph + magnitudeParagraph + "</div> <br>";
            }
            
        }
        document.getElementById("bulletinRefresh").src = img_array[1];
    })
}

function getDynamoDBSearchTerms() {
    const url = `https://ctmsiq97z7.execute-api.us-east-1.amazonaws.com/default/getRedditSearchTerms`;
    //const url = 'https://4s1srdjjh3.execute-api.us-east-1.amazonaws.com/test/getRedditSearchTerms';
    
    fetch(url, {
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url            
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log("Terms: ", data);
        let i;
        for(i = 0; i < data.terms.length; i++) {
            if(i != data.terms.length - 1) {
                document.getElementById("infoParadiv").innerHTML += "<span class = \"term\">" + data.terms[i].term + "<span class=\"tab\">" + "</span>";
            } else {
                document.getElementById("infoParadiv").innerHTML += "<span class = \"term\">" + data.terms[i].term + " </span>";
            }
            
        }
    })
}

function addRedditSearchTerm() {
    const url = 'https://b49u0fd6n5.execute-api.us-east-1.amazonaws.com/default/addRedditSearchTerm';
    const termToAdd = document.getElementById("create").value;

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({term: termToAdd}) // body data type must match "Content-Type" header
    }).then(response => {
        return response.json();

    }).then(data => {
        return callback(data);
    })
}


//https://4s1srdjjh3.execute-api.us-east-1.amazonaws.com/test/addRedditSearchTerm