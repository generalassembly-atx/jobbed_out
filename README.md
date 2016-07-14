# JobbedOut

We're building a job tracker for popular job listings you all might want to check out once class is done :)

We've already given you:
- A 'job' model with 4 fields:
    - A title for the job (i.e. "Full Stack Developer")
    - An Employer
    - A link to the job posting (literally a full URL)
    - A description of the job (this is optional)
- The routes for listing all the jobs, showing one job at a time, creating a job, updating a job, deleting a job
- The beginnings of a view that you can edit

## Still To Do
- You must create a database on mLab with a 'jobs' collection, and save the connection string to a `.env` file in a variable named `JOBBED_OUT_DB`
- Run `node seeds.js` to seed the database with 3 jobs I've already added for you.
- You must edit the `app.js` and `index.ejs` files so that the job listings are no longer loaded by the server in EJS, but instead by AJAX
- You must allow users to create new jobs by submitting the form on the home page modal, and sending an AJAX request to the server to push it to the database. You must also update the UI accordingly when this happens.
- You must allow users to delete a job if they don't like it. Again, this must happen both in the database and in the UI, so you must use AJAX.

## Bonus
- Allow users to update a job to change it, again via AJAX.
- Create a form that allows users to search for jobs by Title (using the `searchTitle` query param) or by Employer (using the `searchEmployer` query param). The `GET /api/v1/jobs` route is already built out to accept these types of search queries, you just need to build the frontend (again, with AJAX).
