const radio_buttons = document.querySelectorAll('input[name="display_option"]');
const checkbox = document.getElementById('change_icon');
const save_button = document.getElementById('save_button');

chrome.storage.sync.get(['display_option', 'icon_preference'], (data) => {
  if (data.display_option) {
    document.querySelector(`input[name="display_option"][value="${data.display_option}"]`).checked = true;
  }
  checkbox.checked = data.icon_change || false;
});


save_button.addEventListener('click', () => {
  const selected_display_option = Array.from(radio_buttons).find(radio => radio.checked)?.value;

  const icon_change = checkbox.checked;

  chrome.storage.sync.set({ display_option: selected_display_option, icon_preference: icon_change }, () => {
    alert('Settings saved!');
  });
});