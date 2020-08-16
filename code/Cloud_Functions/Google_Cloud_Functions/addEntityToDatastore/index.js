/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

  const cors = require('cors')({origin: true});
  const { Datastore } = require('@google-cloud/datastore');

  exports.addEntityToDatastore = async (req, res) => {
  cors(req, res, async () => {
    const test = "hello";

    const datastore = new Datastore();

    const reportKey = datastore.key(['sentimentReports']);

    const title = req.body.title;
    const score = req.body.score;
    const magnitude = req.body.magnitude;

    const kind = "sentimentReports";
    const query = datastore.createQuery(kind)
    .order('Id', {
    descending: true,
    });

    const [tasks] = await datastore.runQuery(query);

    const report = {
      Title: title,
      Score: score,
      Magnitude: magnitude,
      Id: tasks[0].Id + 1 || 0,
    };

    const entity = {
      key: reportKey,
      data: report,
    };

    datastore.insert(entity).then(() => {
      // Task inserted successfully.
    });

    let response = {test}
    res.status(200).send(response);
  });
};