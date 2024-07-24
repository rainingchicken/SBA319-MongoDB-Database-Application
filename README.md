# SBA 319 MongoDB

## ROLES

Users can either be "admin" or "basic."

## SEED

To use the provided samples of users, dashboards, and jobs, you must GET at `/seed`. Note the `_id` will be different every time you seed.

sample of users

```js
{
  "_id": ObjectId("66a15b14191becbd84e1e1d0"),
  "username": "rain",
  "role": "admin",
  "__v": 0
}
```

```js
{
  "_id": ObjectId("66a15b14191becbd84e1e1d4"),
  "username": "ray",
  "role": "basic",
  "__v": 0
}
```

sample of dashboard

```js
{
  "_id": "66a15b14191becbd84e1e1d1",
  "name": "rain's dahsboard",
  "userId": "66a15b14191becbd84e1e1d0",
  "jobs": [
      "66a15b14191becbd84e1e1d2",
      "66a15b14191becbd84e1e1d3"
  ],
  "__v": 0
}
```

sample of jobs

```js
{
  "_id": "66a15b14191becbd84e1e1d2",
  "title": "Software Engineer",
  "pay": 40000,
  "applied": true,
  "dashboardId": "66a15b14191becbd84e1e1d1",
  "__v": 0
}
```

## GET

Admin user can view all or any dashboards. Basic users can only view their own dashboard. All users must provide `{userId: _id}` else acccess will be denied.

sample testing
HTTP Request:

```js
GET;
```

URL:

```js
http://localhost:3000/dashboard/66a15b14191becbd84e1e1d5
```

Body input:

```js
{
    "userId":"66a15b14191becbd84e1e1d4" //basically signing in
}
```

Body output:

```js
{
    "_id": "66a15b14191becbd84e1e1d5",
    "name": "ray's dahsboard",
    "userId": "66a15b14191becbd84e1e1d4",
    "jobs": [
        "66a15b14191becbd84e1e1d6",
        "66a15b14191becbd84e1e1d7"
    ],
    "__v": 0
}
```

## POST

Admin and basic users can post new jobs one at a time. `title` and `dashboardId` are required but only `title` is required in the body. `dashboardId` will be automatically assigned due to the nature of URL being `/dashboard/:dashboardId/jobs`

sample testing
HTTP Request:

```js
POST;
```

URL:

```js
http://localhost:3000/dashboard/66a15b14191becbd84e1e1d5/jobs
```

Body input:

```js
{
    "title": "React Developer II", //required field
    "pay": 200000,
    "applied": true
}
```

Body output:

```js
{
    "title": "React Developer II",
    "pay": 200000,
    "applied": true,
    "dashboardId": "66a15b14191becbd84e1e1d5",
    "_id": "66a16d55191becbd84e1e245",
    "__v": 0
}
```

## PATCH

Admin cannot patch any dashboard or job except its own. Basic users can only patch their own dashboards or jobs as well. All users must provide `{userId: _id}` else acccess will be denied if patching dashboard. You do not need `{userId: _id}` to patch jobs.

sample testing
HTTP Request:

```js
PATCH;
```

URL:

```js
http://localhost:3000/dashboard/66a15b14191becbd84e1e1d5/jobs/66a16d55191becbd84e1e245
```

Body input:

```js
{
    "title": "Java Engineer "
}
```

Body output:

```js
{
    "_id": "66a16d55191becbd84e1e245",
    "title": "React Developer II", //this is confirming which one you changed and you GET, the title will be changed to Java Engineer
    "pay": 200000,
    "applied": true,
    "dashboardId": "66a15b14191becbd84e1e1d5",
    "__v": 0
}
```

## DELETE

Admin can delete any dashboard. Basic user can only delete their own dashboard. Warning DELETE is permanent. Reseeding can "get them back" but the `_id` will be different. All users must provide `{userId: _id}` else acccess will be denied if the user is deleting a dashboard. `{userId: _id}` is not currently needed to delete jobs.

sample testing
HTTP Request:

```js
DELETE;
```

URL:

```js
http://localhost:3000/dashboard/66a15b14191becbd84e1e1d5/jobs/66a16d55191becbd84e1e245
```

Body input:

```js
```

Body output:

```js
{
    "_id": "66a16d55191becbd84e1e245", //this is confirming what you deleted
    "title": "Java Engineer ",
    "pay": 200000,
    "applied": true,
    "dashboardId": "66a15b14191becbd84e1e1d5",
    "__v": 0
}
```

## Requirement

- Use at least three different data collections within the database (such as users, posts, or comments).
  - users.js, dashboard.js, jobs.js
- Utilize reasonable data modeling practices.
  - yes
- Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database.

```js
router.get(
  "/:dashboardId",
  setDashboard,
  authUser,
  authGetDashboard,
  (req, res) => {
    res.json(req.dashboard);
  }
);
```

- Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request.

```js
router.post("/:dashboardId/jobs", async (req, res) => {
  const reqbody = req.body;
  reqbody.dashboardId = req.params.dashboardId;
  const newJob = new Job(reqbody);
  let error;
  try {
    await newJob.save();
    res.send(newJob);
  } catch (err) {
    res.send({ errorMessage: err });
  }
});
```

- Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request.

```js
router.patch(
  "/:dashboardId",
  setDashboard,
  authUser,
  authPatchDashboard,
  async (req, res) => {
    const updatedDashboard = await Dashboard.findByIdAndUpdate(
      req.params.dashboardId,
      req.body
    );
    res.json(updatedDashboard);
  }
);
```

- Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request.

```js
router.delete(
  "/:dashboardId",
  setDashboard,
  authUser,
  authDeleteDashboard,
  async (req, res) => {
    const deletedDashboard = await Dashboard.findByIdAndDelete(
      req.params.dashboardId
    );
    res.json(deletedDashboard);
  }
);
```

- Include sensible MongoDB data validation rules for at least one data collection.
  Note: this may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error.

```js
 dashboardId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Dashboard",
   required: [true, "dashboardId is a required field"],
 },
```

- Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection.
  Note: Double-check this requirement before submission. Testing your delete routes may leave you under the requirement. To be safe, populate your collections with sample data well above the requirement (we recommend 10-20 documents).
  - users and dashboards have 10 documents each. jobs has 10+ documents.
- Utilize reasonable code organization practices.
  - codes are grouped in different folders such as data related in the db folder, schemas are in models folder, routes are in routes folder, and other js scripts are in src folder.
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
  - no errors :D

## Sources

- https://catalog.data.gov/dataset/occupational-employment-statistics
- https://www.youtube.com/watch?v=jI4K7L-LI58
