# Getting Started with DocumentSystem

This project is a test task for BravoSoft.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode + starts jsonServer.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Users Credentials

In database passwords sre stored in md5hash so you might need the original to login.
1) "Иванов Иван Иванович" - login: IvanovI, password: Ivanov1995Pass,
2) "Сидоров Сергей Сергеевич" - login: SidorS, password: sidorov1998Password,
3) "Петров Павел Платонович" - login: PlatonPaw, password: PawelP1989Rabota

## Repeated applications validation

Application ID is an md5Hash that consists of user_name and document_name. JsonServer does not allow us to add objects with duplicated id's, so md5Hash is the best solution that I found to protect bd from duplicates.
