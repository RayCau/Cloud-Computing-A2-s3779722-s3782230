/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

// SELECT title FROM [bigquery-samples:reddit.full] LIMIT 10
// SELECT  FROM `fh-bigquery.reddit_posts.2015_12` LIMIT 10

const cors = require('cors')({origin: true});
const { BigQuery } = require('@google-cloud/bigquery');

exports.getBigQueryRedditTitles = async (req, res) => {
  cors(req, res, async () => {
    const search = req.query.search;
    let year = req.query.year;
    let month = req.query.month;

    if(year == "2015") {
      month = "12";
    } 

    if(year == "2019") {
      if(month == "09" || month == "10" || month == "11" || month == "12") {
        month = "08";
      }
    }

    const bigquery = new BigQuery();
    //const tableName = `fh-bigquery.reddit_posts.2019_08`;
    const tableName = "fh-bigquery.reddit_posts."+year+"_"+month;
    
    const [ rows ] = await bigquery.query({
      query: "SELECT title FROM `" + tableName + "` WHERE title LIKE '%"+ search +"%' LIMIT 10 ",
      useLegacySql: false
    });

    const titles = rows.map(row => row.title);

    res.status(200).send({rows: titles});

  });
};