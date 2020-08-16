/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

  const cors = require('cors')({origin: true});
  const { Datastore } = require('@google-cloud/datastore');

  exports.getEntityFromDatastore = async (req, res) => {
  cors(req, res, async () => {
    const test = "hello";

    const datastore = new Datastore();

    const kind = "sentimentReports";
    const query = datastore.createQuery(kind)
    .order('Id', {
    descending: true,
    }).limit(5);
    const [tasks] = await datastore.runQuery(query);

    console.log('Reports:');
    tasks.forEach(task => console.log(task));

    const reports = tasks.map(task => task.title);

    res.status(200).send(tasks);
  });
};