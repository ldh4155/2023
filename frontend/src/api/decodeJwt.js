export const decodeJwt = () => {
    const token = localStorage.getItem('access')
    const base64Url = token.split('.')[1]; // payload 부분 추출
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload =  JSON.parse(jsonPayload);

    return payload.username;
}