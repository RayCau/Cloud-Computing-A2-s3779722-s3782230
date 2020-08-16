<?php 
  // GOOGLE_CLOUD_PROJECT=a2-cc-proj php -S localhost:8080
  //https://us-central1-a2-cc-proj.cloudfunctions.net/getEntityFromDatabase
?>

<html>

<header>
  <link href="css/indexstyle.css" rel = stylesheet type="text/css">
  <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital@1&display=swap" rel="stylesheet">

  <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">
</header> 

<head>
  <title>Reddit Sentiment Analyser</title>
  <script type="text/javascript" src='js/tools.js'> </script>
</head>
<body onload="getDynamoDBSearchTerms(); getEntityFromDatastore()">
  
  <div id = "banner">
            <img id = "redditlogo" src = "https://www.printplaygames.com/wp-content/uploads/2018/06/reddit-1-logo-png-transparent.png">
            <br><h1 id = "title"><span id = "titlesentiment">sent<span class = "i">i</span>ment </span><span>analys<span class = "i">i</span>s</span></h1>

            <div id = "searchpostdiv">
                    <input type="text" id="searchpost" name="searchpost" placeholder = "Search for a Reddit post title">

                    <input type="button" id="create" value="Search" onclick="getBigQueryRedditTitles();"/>
                    <br>
                    <label class = "searchpostlabel" for="searchpost">Search Filters:</label> <br>
                    <br>
                    <label class = "searchpostlabel" for="searchpost">Year of Post:</label>                     
        
                    <select id = "year" class="dropDown">
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                    </select>
                    <span>|</span>
                    <label class = "searchpostlabel" for="searchpost">Month of Post:</label>
                    <select id ="month" class="dropDown">
                      <option value="01">1</option>
                      <option value="02">2</option>
                      <option value="03">3</option>
                      <option value="04">4</option>
                      <option value="05">5</option>
                      <option value="06">6</option>
                      <option value="07">7</option>
                      <option value="08">8</option>
                      <option value="09">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
            </div>
  </div>


  <div id = "wrap">    
    <nav>
        <ul>
            <li><a href = "index.php">Home</a></li>
            <li><a href = "#resultsHeading">Search Results</a></li>
            <li><a href = "#bulletinHeading">Bulletin Board</a></li>
        </ul>
    </nav>
  </div>

  <div id = "infoParadiv">
    <h1>Hello, and welcome to our sentiment analysis website!</h1>
    <h2>Here are the things that you are able to do!</h3>
    <ul>
      <li>Get sentiment analysis results, i.e. score and magnitude, on Reddit post titles similar to your search.</li>
      <li>Post your favourite sentiment analyses on the public community 'Sentiment Bulletin Board'.</li>
      <li>If you're having difficulty thinking of things to search have a look below...</li>
    </ul>
    <h3>Suggested Search Terms from our DynamoDB!</h3> <br>
  </div>

  <div id = "resultsHeading"> 
    <h> <img id="searchHeadingIcon" src="images/magnifying_glass.png">  </img> Search Results: </h> 
  </div>

  <div id = "loadingImageDiv"> <img id="loadingImage"></img> </div>    
  <div id="results"> <h2 id = "noResults"> No Results to show right now. Try searching for something. </h2> </div> 

  <div id = "BulletinBoard">

    <div id = "buttonHeading">
      
      <h id = "bulletinHeading"> <img id="bulletinHeadingIcon" src="images/pin.png"> </img> Sentiment Bulletin Board </h>
      <input type="image" id="bulletinRefresh" src="images/loading_circle.gif" value="Refresh" onclick="getEntityFromDatastore();"/>  
    </div>
    
    <table id = "bulletinTableStyle"> 
        <tr>
          <td>
            <div id="sentimentReports"></div>
          </td>  
        </tr>
      </table> 
  </div>
  

</body>
<footer>
<p> This website was created by Raymond Caucci (s3779722) and Marco Nadalin (s3782230) for Cloud Computing Assignment 2.
<p> Services:  Google Cloud Functions, Google App Engine, Natural Language API, Google BigQuery, Lambda AWS Functions, AWS API Gateway</P>
<p> Storage: Datastore, DynamoDB </p>
</footer>
</html>
