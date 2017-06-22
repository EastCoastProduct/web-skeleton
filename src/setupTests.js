import { FormData, File, FileList } from 'file-api';

global.FormData = FormData;
global.File = File;
global.FileList = FileList;

global.createResolvedThenable = () => {
  let ok = true;
  let ret;

  return {
    setFulfilled(value) {
      ok = true;
      ret = value;
    },

    setRejeted(reason) {
      ok = false;
      ret = reason;
    },

    then(cb, eb) {
      const f = ok ? cb : eb;
      if (f) f(ret);
    },

    catch(eb) {
      this.then(null, eb);
    },
  };
};
