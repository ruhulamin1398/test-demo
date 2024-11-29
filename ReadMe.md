## change env
```  
cd /var/www/production 
nano fend/.env
nano admin/.env 
cd fend && npm run build && cd ../admin && npm run build && pm2 restart app
```
  


  ```
 nano admin/.env 
REACT_APP_OWNER="0x9B1e830584caDf455F1406C255F24e84e6BE5738"
  ```