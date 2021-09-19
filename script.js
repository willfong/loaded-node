import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 100,
    duration: "1m",
  };

export default function () {
  http.get("http://localhost:3000/count");
  sleep(1);
}
