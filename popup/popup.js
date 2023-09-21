import data20232 from "../data/20232data.js";
//todo
//gps기반으로
//현재 위치-> 무슨 동으로 변환
//todo
//dataMap을 매번 계산하지 말고 init 한번만 한 후 LocalStorage에 저장

function daynumToKor(num) {
  switch (num) {
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "일";
  }
}
const increasePeriod = (period) => {
  document.querySelectorAll("#period")[0].textContent = period + 1;
};
const reducePeriod = (period) => {
  document.querySelectorAll("#period")[0].textContent = period - 1;
};

//현재 교시 찾기
const now = new Date();
const nowPeriod = now.getHours() - 8;
const nowDaysOfWeek = daynumToKor(now.getDay());
const defaultPeriod = nowPeriod + 1;
//todo
//10교시 이후나 -1교시 제한하기
//주말 제한하기
document.querySelectorAll("#period")[0].textContent = defaultPeriod;

let dataMap = new Map();
data20232.forEach(([room, period]) => {
  if (dataMap.has(room)) {
    dataMap.set(room, dataMap.get(room) + period);
  } else {
    dataMap.set(room, period);
  }
});
console.log(dataMap);
const prevButton = document.querySelectorAll(".prev_btn")[0];
prevButton.addEventListener("click", function (e) {
  const period = Number(document.querySelectorAll("#period")[0].textContent);
  document.querySelectorAll("#default_period")[0].textContent = "";
  if (period === 1) {
    alert("1교시보다 적은 교시는 볼 수 없습니다.");
  } else {
    reducePeriod(period);
    rearrange(period - 1);
  }
});
const nextButton = document.querySelectorAll(".next_btn")[0];
nextButton.addEventListener("click", function (e) {
  const period = Number(document.querySelectorAll("#period")[0].textContent);
  document.querySelectorAll("#default_period")[0].textContent = "";
  if (period === 10) {
    alert("10교시보다 큰 교시는 볼 수 없습니다.");
  } else {
    increasePeriod(period);
    rearrange(period + 1);
  }
});

const rearrange = (period) => {
  let room = [];
  dataMap.forEach((value, key) => {
    if (value.includes(`${nowDaysOfWeek}${period}`)) {
      room.push(key);
    }
  });
  const A_Building_Room = document.querySelectorAll(".main_table #A_Building_room")[0];
  const B_Building_Room = document.querySelectorAll(".main_table #B_Building_room")[0];
  const C_Building_Room = document.querySelectorAll(".main_table #C_Building_room")[0];
  const D_Building_Room = document.querySelectorAll(".main_table #D_Building_room")[0];
  const E_Building_Room = document.querySelectorAll(".main_table #E_Building_room")[0];
  const G_Building_Room = document.querySelectorAll(".main_table #G_Building_room")[0];
  const H_Building_Room = document.querySelectorAll(".main_table #H_Building_room")[0];
  const M_Building_Room = document.querySelectorAll(".main_table #M_Building_room")[0];
  const FIKL_Building_Room = document.querySelectorAll(".main_table #FIKL_Building_room")[0];
  const RTU_Building_Room = document.querySelectorAll(".main_table #RTU_Building_room")[0];
  const roomList = [
    A_Building_Room,
    B_Building_Room,
    C_Building_Room,
    D_Building_Room,
    E_Building_Room,
    G_Building_Room,
    H_Building_Room,
    M_Building_Room,
    FIKL_Building_Room,
    RTU_Building_Room,
  ];
  console.log(roomList);
  roomList.forEach((rooms) => {
    rooms.textContent = "";
  });

  room.forEach((r) => {
    switch (r[0]) {
      case "A":
        A_Building_Room.textContent += r + ",";
        break;
      case "B":
        B_Building_Room.textContent += r + ",";
        break;
      case "C":
        C_Building_Room.textContent += r + ",";
        break;
      case "D":
        D_Building_Room.textContent += r + ",";
        break;
      case "E":
        E_Building_Room.textContent += r + ",";
        break;
      case "G":
        G_Building_Room.textContent += r + ",";
        break;
      case "H":
        H_Building_Room.textContent += r + ",";
        break;
      case "M":
        M_Building_Room.textContent += r + ",";
        break;
      case "F":
      case "I":
      case "K":
      case "L":
        FIKL_Building_Room.textContent += r + ",";
        break;
      case "R":
      case "T":
      case "U":
        RTU_Building_Room.textContent += r + ",";
        break;
    }
  });
};
