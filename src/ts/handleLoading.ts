import { $ } from './dom.js';

const loadingTemplate = `
<div class="container">
  <div class="h1Container">
    <div class="cube h1 w1 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w1 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w1 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w2 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w2 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w2 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w3 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w3 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h1 w3 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>
  </div>

  <div class="h2Container">
    <div class="cube h2 w1 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w1 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w1 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w2 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w2 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w2 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w3 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w3 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h2 w3 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>
  </div>

  <div class="h3Container">
    <div class="cube h3 w1 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w1 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w1 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w2 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w2 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w2 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w3 l1">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w3 l2">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>

    <div class="cube h3 w3 l3">
      <div class="face top"></div>
      <div class="face left"></div>
      <div class="face right"></div>
    </div>
  </div>
</div>
`;

export const handleLoading = {
  showLoading: () => {
    $('.cube-loading').innerHTML = loadingTemplate;
    $('.container').classList.add('show');
  },
  hideLoading: () => {
    $('.container').classList.remove('show');
  },
};

export const handleButtons = {
  disabledTrue: () => {
    $<HTMLButtonElement>('#todo-add-btn').setAttribute('disabled', 'true');
  },
  disabledFalse: () => {
    $<HTMLButtonElement>('#todo-add-btn').removeAttribute('disabled');
  },
};

/** ?????? ?????? skeleton UI */
for (let i = 0; i < 10; i++) {
  $('.main__todo').append($('.skeleton').cloneNode(true));
}
