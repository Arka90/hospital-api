# Hospital_API

## How to setup on local system

- Step 1 : Download and extract the zip file

- Step 2 : run ``` npm install ``` on the terminal

## API end points

- ### To Register an doctor make a post request to

```localhost:3000/api/v1/doctors/register```

provide name , username and password in the body

![register doctor](https://user-images.githubusercontent.com/64225385/227275773-b79ab424-1b79-419b-932e-1fd6432a1537.JPG)


- ### To Login a doctor make a post request to

```localhost:3000/api/v1/doctors/login```

provide username and password in the body

![login](https://user-images.githubusercontent.com/64225385/227276577-f4847d14-645a-4e8c-8b76-3f5514910227.JPG)

after login you will get an token copy that


- ### To Register an patient make a post request to

```localhost:3000/api/v1/patient/register```

**Note you need to be loggedin as a doctor to access this route**

![authorization](https://user-images.githubusercontent.com/64225385/227277451-ab0ee881-a02c-4c63-9462-a1687d450bb0.JPG)


paste the token on the bearer token on Authorization header


provide phoneNo in the body


- ### To Create an report make a post request to

```localhost:3000/api/v1/patient/patient_id/create_report```

again to access this route you need to be logged in as doctor so follow the above step


in body you need to provide status form these four options ``` ["negative","travelled-quarantine","symptoms-quarantine", "positive-admit"] ```

- ### To get all reports of an particular patient make an GET request to

```localhost:3000/api/v1/patient/patient_id/all_reports```



- ### To get  reports of an particular Status make an GET request to

```localhost:3000/api/v1/reports/negative```




