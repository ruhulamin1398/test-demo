## change env
```  
cd /var/www/production 
nano fend/.env
nano admin/.env 
cd fend && npm run build && cd ../admin && npm run build && pm2 restart app
```
  