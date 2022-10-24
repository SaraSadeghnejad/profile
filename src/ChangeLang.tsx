import { FormControl, FormLabel, Link, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

function ChangeLang({}: Props) {
 const [isEnActive, setIsEnActive] = useState(false);
  const [isFaActive, setIsFaActive] = useState(false);
  const router = useRouter();
  const handleLocaleChangeFa = (event) => {
        setIsFaActive((current) => !current);
            setIsEnActive(false);
      const value = event.target.value;
      router.push(router.route, router.asPath, {
          locale: value,
      });
  };
    const handleLocaleChangeEn = (event) => {
          setIsEnActive((current) => !current);
                  setIsFaActive(false);
      const value = event.target.value;
      router.push(router.route, router.asPath, {
        locale: value,
      });
    };
         useEffect(() => {
           if(router.locale=="fa"){
                 setIsFaActive(true);
                 setIsEnActive(false);
           }else{
                     setIsFaActive(false);
                     setIsEnActive(true);
           }
         }, []);
  return (
    <div>
      <FormLabel
        sx={{ mx: 1 }}
        style={{
          color: isFaActive ? "rgb(255, 168, 46)" : "rgb(221, 221, 221)",
        }}
      >
        فارسی
        <input
          style={{
            visibility: "hidden"
          }}
          type="submit"
          onClick={(event) => {
            handleLocaleChangeFa(event);
          }}
          value="fa"
        />
      </FormLabel>
      <FormLabel
        style={{
          color: isEnActive ? "rgb(255, 168, 46)" : "rgb(221, 221, 221)",
        }}
      >
        English
        <input
          style={{
            visibility: "hidden"
          }}
          type="submit"
          onClick={(event) => {
            handleLocaleChangeEn(event);
          }}
          value="en"
        />
      </FormLabel>
    </div>
  );
}

export default ChangeLang