# SimpleApp

```
git clone https://github.com/DaemonOld/simpleapp
virtualenv -p python3 .
source bin/activate
cd simpleapp
pip install -r requirements.txt
```

## backend
python3 manage.py migrate  
python3 manage.py loaddata data.json  
python3 manage.py runserver

## frontend
```
cd frontend
npm install
npm run serve
```


Django - localhost:8000  
Vue - localhost:8080


### Build
```
npm run build
```

## P.S.
Сделал один файл data.json с дампами объектов, типами объетов, ну и ешё 2-х пользователей туда добавил.  
Пользователь - пароль  
1. admin - admin  
2. User1 - use12345
