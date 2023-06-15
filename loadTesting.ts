import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  duration: '15s', // ถ้าวินาทีใช้ s, นาทีใช้ m
  vus: 10, // Number of virtual users
};

export default function () {
  const response = http.get('http://localhost:3000/api/users'); // Replace with your desired URL
  if (response.status === 200) {
    console.log('Success: GET request was successful');
  } else {
    console.log(`Failure: GET request failed with status ${response.status}`);
  }
  sleep(1); // Wait for 1 second between requests : ทำการ delay เพื่อรอแต่ละ request
}