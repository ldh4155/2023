import { useDaumPostcodePopup } from 'react-daum-postcode';

export const PostCode = ({setSido, setSigungu, setAddress}) => {
    const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);
  
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
  
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
  
      setSido(data.sido);
      setSigungu(data.sigungu);
      setAddress(fullAddress);

    };
  
    const handleClick = () => {
      open({ onComplete: handleComplete });
    };
  
    return (
      <button type='button' onClick={handleClick}>
        주소 검색
      </button>
    );
  };

