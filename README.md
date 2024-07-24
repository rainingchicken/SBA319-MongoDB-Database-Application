# SBA 319 MongoDB

## ROLES

Users can either be "admin" or "basic."

## GET

Admin user can view all or any dashboards. Basic users can only view their own dashboard. All users must provide `{userId: _id}` else acccess will be denied.

## POST

Admin and basic users can post new user. A dashboard cannot be posted without assigning it to a user, i.e. need to create user before creating new dashboard. Users can only have one dashboard.

## PATCH

Admin cannot patch any dashboard except its own. Basic users can only patch their own as well. All users must provide `{userId: _id}` else acccess will be denied.

## DELETE

Admin can delete any dashboard. Basic user can only delete their own dashboard. Warning DELETE is permanent. Reseeding can "get them back" but the `_id` will be different. All users must provide `{userId: _id}` else acccess will be denied.

## Requirement

- Use at least three different data collections within the database (such as users, posts, or comments).
  - users.js, dashboard.js, jobs.js
- Utilize reasonable data modeling practices.
  - yes
- Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database.
- Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request.
- Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request.
- Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request.
- Include sensible MongoDB data validation rules for at least one data collection.
  Note: this may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error.
- Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection.
  Note: Double-check this requirement before submission. Testing your delete routes may leave you under the requirement. To be safe, populate your collections with sample data well above the requirement (we recommend 10-20 documents).
- Utilize reasonable code organization practices.
  - codes are grouped in different folders such as data related in the db folder, schemas are in models folder, routes are in routes folder, and other js scripts are in src folder.
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
  - no errors :D

## Sources

- https://catalog.data.gov/dataset/occupational-employment-statistics
