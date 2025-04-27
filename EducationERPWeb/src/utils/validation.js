import {toast} from 'react-toastify';

export function schoolDataValidation(formData) {
  if (formData.address == '') {
    toast.error('School Address Cannot be empty');
    return false;
  }
  if (formData.admin_mobile.length!=10) {
    toast.error('Admin Mobile number must be of 10 digits');
    return false;
  }
  if (formData.admin_password.length < 1) {
    toast.error('Password Should Not be Empty');
    return false;
  }
  if (formData.admin_username.length < 1) {
    toast.error('Username Should Not be Empty');
    return false;
  }

  if (formData.name.length < 1) {
    toast.error('School Name Should Not be Empty');
    return false;
  }

 return true;
}
export function campusValidation(formData) {

  return true;
}

export function StudentDataValidation(formData) {
  let phoneregx = /^[0-9]{10}$/;
  if (formData.firstName == '') {
    toast.error('Name cannot be empty');
    return false;
  }
  if (formData.fatherName == '') {
    toast.error('father Name cannot be empty');
    return false;
  }
  if (formData.fatherMobileNumber.length!=10) {
    toast.error('Father Mobile number must be of 10 digits');
    return false;
  }
  if (formData.motherMobileNumber.length != 10) {
    toast.error('Mother Mobile number must be of 10 digits');
    return false;
  }



  // if (!formData.mobile.match(phoneregx)) {
  //   toast.error('Mobile number must be 10 digits');
  //   return false;
  // }
  // if (formData.nature == '') {
  //   toast.error('Nature of Student cannot be empty');
  //   return false;
  // }
  // if (formData.house == '') {
  //   toast.error('House of Student cannot be empty');
  //   return false;
  // }
  // if (formData.gender == '') {
  //   toast.error('Gender of Student cannot be empty');
  //   return false;
  // }

  return true;
}

export function StaffdataValidation(formData) {
  let phoneregx = /^[0-9]{10}$/;
  let emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  let pincoderegex = /^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$/;

  if (formData.firstName == '') {
    toast.error('Name is required');
    return false;
  }

  if (formData.lastName == '') {
    toast.error('Last name is required');
    return false;
  }

  if (formData.shortName == '') {
    toast.error('Short name is required');
    return false;
  }


  // if (!formData.email.match(emailregex)) {
  //   toast.error('email is required');
  //   return false;
  // }
  
  
  // if (
  //   formData.dateOfBirthTimeStamp == null ||
  //   formData.dateOfBirthTimeStamp == NaN ||
  //   formData.dateOfJoiningTimeStamp == null ||
  //   formData.dateOfJoiningTimeStamp == NaN
  // ) {
  //   toast.error('Date is required');
  //   return false;
  // }




  // if (formData.Designation == '') {
  //   toast.error('Designation are required');
  //   return false;
  // }

  // if (formData.subjects == '') {
  //   toast.error('Subjects are required');
  //   return false;
  // }

  // if (formData.classes == '') {
  //   toast.error('Classes are required');
  //   return false;
  // }

  // if (formData.classId == '') {
  //   toast.error('Main Class is required');
  //   return false;
  // }

  return true;
}

// export function StaffdataSecondValidation(formData) {
//   let phoneregx = /^[0-9]{10}$/;
//   let emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//   let pincoderegex = /^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$/;


//   if (formData.designation == '') {
//     toast.error('Designation are required');
//     return false;
//   }

//   // if (formData.subjects?.length ===0) {
//   //   toast.error('Subjects are required');
//   //   return false;
//   // }


//   return true;
// }



export function SubjectValidation(formData) {
  if (formData.name == '') {
    toast.error('Subject is required');

    return false;
  }
  if (formData.shortName == '') {
    toast.error('shortName is required');
    return false;
  }
  // if (formData.classes?.length == 0) {
  //   toast.error('class are required');
  //   return false;
  // }
  return true;
}

export function ShiftmodelValidation(formData, timeData) {
  if (formData.name == '') {
    toast.error('Name is required');
    return false;
  }

  if (formData.daysInWeek.length == 0) {
    toast.error('Select Days required');
    return false;
  }
  if (formData.numberOfPeriods == 0) {
    toast.error('Number of period is required');
    return false;
  }
  if (formData.zeroPeriod == true) {
    if (formData.durationOfZeroPeriod == '') {
      toast.error('Name of Zero period is required');

      return false;
    }
  }

  if (formData.durationOfPeriod == '') {
    toast.error('Duration of period is required');

    return false;
  }

  if (timeData.durationOfLunch == null) {
    toast.error('duration of lunch is required');
    return false;
  }

  if (formData.lunchAfterPeriod == null) {
    toast.error('lunch after period  is required');
    return false;
  }

  if (formData.summerStartTime == 0) {
    toast.error('summar start time required');
    return false;
  }
  if (formData.summerStartTime > formData.summerEndTime) {
    toast.error('Start time must be greater than End time ');
    return false;
  }
  if (formData.winterStartTime > formData.winterEndTime) {
    toast.error('Carefully select the time');
    return false;
  }
  if (formData.winterStartTime == 0) {
    toast.error('winter start time required');
    return false;
  }
  if (formData.lunchAfterPeriod > formData.numberOfPeriods) {
    toast.error(
      'Lunch after period should be less than total number of periods',
    );
    return false;
  }
  return true;
}

export function GrouptmodelValidation(formData) {
  if (formData.name == '') {
    toast.error('Name is required');
    return false;
  }

  if (formData.class.length == 0) {
    toast.error('class are required');
    return false;
  }

  return true;
}
