let map;
const ZOOM_LEVEL = 20;
const BOTTOM_UI_PADDING = 40;
const PROFILE_ICON_PADDING = 20;
const PLACE_NAME_PADDING = 25;
let profButton;
let navMenu;
let overlay;

function getCurrentPosition(callback){
  let lat = 35.6894;
  let lng = 139.6917;

  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    callback({ lat, lng });
  }, _error => {
    alert("現在位置を取得できませんでした");
    callback({ lat, lng });
  });
}

async function initMap() {

  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  getCurrentPosition(position => {

    const { lat, lng } = position;
    map = new Map(document.getElementById("map"), {
      center: { lat: lat, lng: lng },
      zoom: ZOOM_LEVEL,
      disableDefaultUI: true,
      mapId: "909c281cd849660e",
    });

    // マップ下部に表示するUI
    const BottomUI = document.createElement("div");
    // プロフィール画面を表示するUI(右上に表示)
    const ProfileUI = document.createElement("div");
    // 地名を表示するUI
    const PlaceNameUI = document.createElement("div");

    // マップ下部に表示するボタン1
    const BookButton = document.createElement("button");
    BookButton.textContent = "";
    BookButton.id = "book-btn";
    BottomUI.appendChild(BookButton);

    // マップ下部に表示する現在地に移動するボタン
    const locationButton = document.createElement("button");
    locationButton.textContent = "";
    locationButton.id = "location-btn";
    locationButton.style.margin = "0 20px";
    BottomUI.appendChild(locationButton);

    // マップ下部に表示するボタン3
    const CommentButton = document.createElement("button");
    CommentButton.textContent = "";
    CommentButton.id = "comment-btn";
    BottomUI.appendChild(CommentButton);

    // プロフィール画面を表示するボタン
    const ProfileButton = document.createElement("button");
    ProfileButton.textContent = "";
    ProfileButton.id = "profile-btn";
    ProfileButton.classList.add("menu-event");
    ProfileUI.appendChild(ProfileButton);

    // 地名の表示
    const PlaceName = document.createElement("p");
    PlaceName.textContent = "鹿児島市";
    PlaceName.id = "place-name";
    PlaceNameUI.appendChild(PlaceName);

    // UIの余白の設定
    BottomUI.style.paddingBottom = BOTTOM_UI_PADDING + "px";
    ProfileUI.style.paddingRight = PROFILE_ICON_PADDING + "px";
    ProfileUI.style.paddingTop = PROFILE_ICON_PADDING + "px";
    PlaceNameUI.style.paddingLeft = PLACE_NAME_PADDING + "px";
    PlaceNameUI.style.marginTop = "-" + PLACE_NAME_PADDING + "px";

    // マップにUIを追加
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(BottomUI);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(ProfileUI);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(PlaceNameUI);

    // 現在地に移動するボタンの処理
    locationButton.addEventListener("click", () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            map.panTo(pos, 2000);
          },
          () => {
            alert("現在位置を取得できませんでした");
          }
        );
      }else{
        alert("位置情報はサポートされていません")
      }
    });

    // ボタン1の処理
    BookButton.addEventListener("click", () => {
      alert("一覧画面を表示します")
    });

    // ボタン2の処理
    CommentButton.addEventListener("click", () => {
      alert("コメント画面を表示します")
    });

    // プロフィール画面を表示するボタンの処理
    ProfileButton.addEventListener("click", menuToggle);
  });
}

function menuToggle() {
  console.log("click")
  
  navMenu.classList.toggle('nav-menu-open');
  overlay.classList.toggle('overlay-on');
}

document.addEventListener('DOMContentLoaded', function(){
  
  profButton = document.getElementById('profile-btn');
  navMenu = document.getElementById('nav-menu');
  overlay = document.getElementById('overlay');

  const menuEvent = document.getElementsByClassName('menu-event');
  for(let i = 0; i < menuEvent.length; i++) {
      menuEvent[i].addEventListener('click', menuToggle, false);
  }

}, false);