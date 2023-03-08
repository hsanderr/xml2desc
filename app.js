let fileHandle;

function mobileCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

if (!mobileCheck()) {
  butOpenFile.addEventListener('click', async () => {
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    document.getElementById('in').value = contents;
  });
} else {
  butOpenFile.addEventListener('click', async () => {
    document.getElementById('mobileFileInput').click();
  });
  document.getElementById('mobileFileInput').onchange = (evt) => {
    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result; // this is the content!
      document.getElementById('in').value = contents;
    };
  };
}

function notEqualToZero(time) {
  return time > 0;
}

function myFunction() {
  document.getElementById('coppiedMsg').classList.add('d-none');
  var z = document.getElementById('in').value;
  var x = z.substring(
    z.indexOf('<xmpDM:markers>', z.indexOf('TableOfContents')),
    z.indexOf('</xmpDM:markers>', z.indexOf('TableOfContents'))
  );
  var regex1 = /name/g,
    regex2 = /startTime/g,
    ind1 = [],
    result1,
    ind2 = [],
    result2;
  while ((result1 = regex1.exec(x))) {
    ind1.push(result1.index);
  }
  while ((result2 = regex2.exec(x))) {
    ind2.push(result2.index);
  }
  document.getElementById('out').innerHTML = '';
  var y = [],
    t = [],
    th = [],
    tmin = [],
    ts = [],
    th_str = [],
    tmin_str = [],
    ts_str = [],
    i = 0,
    j;
  for (j = 0; j < ind1.length; j++) {
    if (x.substring(ind1[j] + 6, ind1[j] + 11) != 'Slide') {
      y[i] = x.substring(ind1[j] + 6, ind2[j] - 8);
      t[i] = parseInt(
        x.substring(ind2[j] + 11, x.indexOf(`"`, ind2[j] + 11)),
        10
      );
      tmin[i] = Math.floor(t[i] / 60000);
      th[i] = Math.floor(tmin[i] / 60);
      ts[i] = Math.round((t[i] / 60000 - Math.floor(t[i] / 60000)) * 60);
      th_str[i] = th[i].toString();
      tmin_str[i] = tmin[i].toString();
      if (tmin[i] < 10) {
        tmin_str[i] = '0' + tmin_str[i];
      }
      ts_str[i] = ts[i].toString();
      if (ts[i] < 10) {
        ts_str[i] = '0' + ts_str[i];
      }
      i++;
    }
  }
  for (i = 0; i < y.length; i++) {
    if (th.some(notEqualToZero) === true) {
      document.getElementById('out').innerHTML += th_str[i];
      document.getElementById('out').innerHTML += ':';
    }
    document.getElementById('out').innerHTML += tmin_str[i];
    document.getElementById('out').innerHTML += ':';
    document.getElementById('out').innerHTML += ts_str[i];
    document.getElementById('out').innerHTML += '&nbsp';
    document.getElementById('out').innerHTML += y[i];
    document.getElementById('out').innerHTML += '\n';
  }
}

function ondragoverHandler(evt) {
  evt.preventDefault();
}

function onfilesdropHandler(event) {
  event.stopPropagation();
  event.preventDefault();
  var files = event.dataTransfer.files;

  for (var i = 0, f; (f = files[i]); i++) {
    let reader = new FileReader();

    reader.readAsText(f);

    reader.onload = function () {
      document.getElementById('in').value = reader.result;
    };
  }
}

function copyToClipboard() {
  // Get the text field
  var copyText = document.getElementById('out');

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 100000); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  document.getElementById('coppiedMsg').classList.remove('d-none');
}
