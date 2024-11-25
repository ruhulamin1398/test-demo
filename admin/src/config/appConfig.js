const  prodAppConfig = {
    api: process.env.REACT_APP_API_URL, 
  }
  
  const  devdAppConfig = {
    api: process.env.REACT_APP_DEV_API_URL, 
  }
  
  
  const getAppConfig=  () => {
    const environment = process.env.REACT_APP_ENVIRONMENT || 'prod';
    if(environment == "dev"){
        return devdAppConfig;
    }
    else{
       return prodAppConfig;
    }
   
  }
  
  
  
  export const  appConfig = getAppConfig();
  