import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import _Time "mo:base/Time";

persistent actor {

  // ===== BLOOD DONATION =====

  // Transient counters & maps (not stored across upgrades)
  transient var bdid : Int = 0;

  public type DonorRegistrations = {
    name : Text;
    age : Nat64;
    bloodGroup : Text;
    weight : Text;
    lastDonationDate : Text;
    contact : Text;
    medicalHistory : Text;
    prin : Principal;
  };

  public type DonorRegistration = {
    name : Text;
    age : Nat64;
    bloodGroup : Text;
    weight : Text;
    lastDonationDate : Text;
    contact : Text;
    medicalHistory : Text;
    prin : Principal;
    don_id : Int;
  };

  transient var DonorReg = HashMap.HashMap<Int, DonorRegistration>(0, Int.equal, Int.hash);

  public func set_Donor_registration(details : DonorRegistrations) : async Text {
    let newDonorRegistration = {
      name = details.name;
      age = details.age;
      bloodGroup = details.bloodGroup;
      weight = details.weight;
      lastDonationDate = details.lastDonationDate;
      contact = details.contact;
      medicalHistory = details.medicalHistory;
      prin = details.prin;
      don_id = bdid;
    };
    DonorReg.put(bdid, newDonorRegistration); // FIX: use bdid
    bdid := bdid + 1;
    return "successfully registered";
  };

  public shared query func get_Donor_Registrations(prin : Principal) : async [DonorRegistration] {
    var donors : [DonorRegistration] = [];
    for ((_, donor) in DonorReg.entries()) {
      if (donor.prin == prin) {
        donors := Array.append<DonorRegistration>(donors, [donor]);
      };
    };
    return donors;
  };

  public shared query func get_Donors_size() : async Nat {
    return DonorReg.size();
  };

  public shared query func get_all_Donors() : async [DonorRegistration] {
    return Iter.toArray(DonorReg.vals());
  };

  public type RecipientRegistrations = {
    name : Text;
    age : Nat64;
    reqbloodGroup : Text;
    units : Nat64;
    urgencyLevel : Text;
    hospitalName : Text;
    contact : Text;
    reasonForReq : Text;
    prin : Principal;
  };

  public type RecipientRegistration = {
    name : Text;
    age : Nat64;
    reqbloodGroup : Text;
    units : Nat64;
    urgencyLevel : Text;
    hospitalName : Text;
    contact : Text;
    reasonForReq : Text;
    prin : Principal;
    rep_id : Int;
  };

  transient var RecipientReg = HashMap.HashMap<Int, RecipientRegistration>(0, Int.equal, Int.hash);

  public func set_Recipient_registration(details : RecipientRegistrations) : async Text {
    let newRecipientRegistration = {
      name = details.name;
      age = details.age;
      reqbloodGroup = details.reqbloodGroup;
      units = details.units;
      urgencyLevel = details.urgencyLevel;
      hospitalName = details.hospitalName;
      contact = details.contact;
      reasonForReq = details.reasonForReq;
      prin = details.prin;
      rep_id = bdid;
    };
    RecipientReg.put(bdid, newRecipientRegistration); // FIX: use bdid
    bdid := bdid + 1;
    return "successfully registered";
  };

  public shared query func get_Recipient_Registration(prin : Principal) : async [RecipientRegistration] {
    var recipients : [RecipientRegistration] = [];
    for ((_, recipient) in RecipientReg.entries()) {
      if (recipient.prin == prin) {
        recipients := Array.append<RecipientRegistration>(recipients, [recipient]);
      };
    };
    return recipients;
  };

  public shared query func get_Recipient_size() : async Nat {
    return RecipientReg.size();
  };

  public shared query func get_all_Recipient() : async [RecipientRegistration] {
    return Iter.toArray(RecipientReg.vals());
  };

  // ===== ORGAN DONATION =====

  transient var odid : Int = 0;

  public type ODDonorRegistrations = {
    name : Text;
    age : Nat64;
    bloodGroup : Text;
    organ : Text;
    contact : Text;
    medicalHistory : Text;
    prin : Principal;
  };

  public type ODDonorRegistration = {
    name : Text;
    age : Nat64;
    bloodGroup : Text;
    organ : Text;
    contact : Text;
    medicalHistory : Text;
    prin : Principal;
    don_id : Int;
  };

  transient var ODDonorReg = HashMap.HashMap<Int, ODDonorRegistration>(0, Int.equal, Int.hash);

  public func set_Donor_registrationOD(details : ODDonorRegistrations) : async Text {
    let newDonorRegistration = {
      name = details.name;
      age = details.age;
      bloodGroup = details.bloodGroup;
      organ = details.organ;
      contact = details.contact;
      medicalHistory = details.medicalHistory;
      prin = details.prin;
      don_id = odid;
    };
    ODDonorReg.put(odid, newDonorRegistration); // FIX: use odid
    odid := odid + 1;
    return "successfully registered";
  };

  public shared query func get_Donor_RegistrationsOD(prin : Principal) : async [ODDonorRegistration] {
    var donors : [ODDonorRegistration] = [];
    for ((_, donor) in ODDonorReg.entries()) {
      if (donor.prin == prin) {
        donors := Array.append<ODDonorRegistration>(donors, [donor]);
      };
    };
    return donors;
  };

  public shared query func get_Donors_sizeOD() : async Nat {
    return ODDonorReg.size();
  };

  public shared query func get_all_DonorsOD() : async [ODDonorRegistration] {
    return Iter.toArray(ODDonorReg.vals());
  };

  public type ODRecipientRegistrations = {
    name : Text;
    age : Nat64;
    bloodGroup : Text;
    reqorgan : Text;
    urgencyLevel : Text;
    contact : Text;
    medicalHistory : Text;
    prin : Principal;
  };

  public type ODRecipientRegistration = {
    name : Text;
    age : Nat64;
    bloodGroup : Text;
    reqorgan : Text;
    urgencyLevel : Text;
    contact : Text;
    medicalHistory : Text;
    prin : Principal;
    rep_id : Int;
  };

  transient var ODRecipientReg = HashMap.HashMap<Int, ODRecipientRegistration>(0, Int.equal, Int.hash);

  // FIX: takes ODRecipientRegistrations, not RecipientRegistrations
  public func set_Recipient_registrationOD(details : ODRecipientRegistrations) : async Text {
    let newRecipientRegistration = {
      name = details.name;
      age = details.age;
      bloodGroup = details.bloodGroup;
      reqorgan = details.reqorgan;
      urgencyLevel = details.urgencyLevel;
      contact = details.contact;
      medicalHistory = details.medicalHistory;
      prin = details.prin;
      rep_id = odid;
    };
    ODRecipientReg.put(odid, newRecipientRegistration); // FIX: use odid
    odid := odid + 1;
    return "successfully registered";
  };

  public shared query func get_Recipient_RegistrationOD(prin : Principal) : async [ODRecipientRegistration] {
    var recipients : [ODRecipientRegistration] = [];
    for ((_, recipient) in ODRecipientReg.entries()) {
      if (recipient.prin == prin) {
        recipients := Array.append<ODRecipientRegistration>(recipients, [recipient]);
      };
    };
    return recipients;
  };

  public shared query func get_Recipient_sizeOD() : async Nat {
    return ODRecipientReg.size();
  };

  public shared query func get_all_RecipientOD() : async [ODRecipientRegistration] {
    return Iter.toArray(ODRecipientReg.vals());
  };

//VACCINE 

  public type doc_details = {
    name : Text;
    age : Nat64;
    dob : Text;
    specialization : Text;
    licenseNumber : Text;
    prin : Principal;
  };

  transient var doc_reg_arr = HashMap.HashMap<Principal, doc_details>(0, Principal.equal, Principal.hash);

  public func reg_doc(details : doc_details) : async Text {
    var check = doc_reg_arr.get(details.prin);
    switch (check) {
      case (?_found) { return "user already exist" };
      case (null) {
        let new_doc_details = {
          name = details.name;
          age = details.age;
          dob = details.dob;
          specialization = details.specialization;
          licenseNumber = details.licenseNumber;
          prin = details.prin;
        };
        doc_reg_arr.put(details.prin, new_doc_details);
        return "registered";
      };
    };
  };

  public shared query func get_doc_details(prin:Principal): async Int{
    var verify = doc_reg_arr.get(prin);
    switch(verify) {
      case(?found) {
        if(found.prin == prin){ 
        return 1;
        }else{
          return 0;
        }
       };
      case(null) {
        return 0;
       };
    };
  };

  public func remove_doctors(): async Text {
    doc_reg_arr:= HashMap.HashMap<Principal, doc_details>(0, Principal.equal, Principal.hash);
    return "removed";
  };

  public type record_vaccination = {
    user_id:Principal;
    doctor_id:Principal;
    vaccine_nm:Text;
    date:Text;
    batch_number:Text;
    next_dose:Text;
  };

  var vaccine_data:[record_vaccination] = [];
  
  public func set_record_vaccine(details:record_vaccination): async Text{
    vaccine_data:=Array.append<record_vaccination>(vaccine_data , [details]);
    return "true";
  };

  public shared query func get_vaccine_data():async [record_vaccination]{
    return vaccine_data;
  };

  public shared query func get_vaccine_data_by_principal(userid:Principal):async [record_vaccination]{
    return Array.filter<record_vaccination>(vaccine_data , func x=x.user_id == userid);
  };

//Medical records
 
  public type UserRole = {
    user_Prin:Principal;
    role:Nat64;
  };

  public type DoctorRegistration = {
    name:Text;
    email:Text;
    medical_license_number:Text;
    specialization:Text;
    years_of_experience:Nat64;
    role:Nat64;
    prin:Principal;
  };
  
  var user_role:[UserRole] = [];
  public func GetUserRole(det:UserRole): async Text{
    user_role:=Array.append<UserRole>(user_role , [det]);
    return "OK";
  };

  public func DeleteUserRole():async Text{
    user_role:=[];
    return "users's role deleted";
  };

  public shared query func getUserRole(user_Prin:Principal) : async Nat64 {
   var answer = Array.find<UserRole>(user_role , func x = x.user_Prin == user_Prin);
   switch(answer) {
    case(?found){ 
      return found.role 
    };
    case(null){
      return 0 
    };
   };
  };


   var doc_reg:[DoctorRegistration] = [];

  public func SetDoctor(doc_det:DoctorRegistration):async Text {
    doc_reg:= Array.append<DoctorRegistration>(doc_reg , [doc_det]);
    return "OK";
  };

  public shared query func getDoctordet(prin:Principal): async ?DoctorRegistration{
    return Array.find<DoctorRegistration>(doc_reg , func x=x.prin == prin);
  };

  public shared query func getDoctorNm(prin:Principal): async Text{
    var answer = Array.find<DoctorRegistration>(doc_reg , func x=x.prin == prin);
    switch(answer) {
      case(?found) { 
        return found.name;
       };
      case(null) {
        return "null";
       };
    };
  };

  public func Delete_Doctors_Registrations():async Text {
    doc_reg:=[];
    return "Deleted";
  };

  public type PatientRegistration = {
    name:Text;
    email:Text;
    dob:Text;
    blood_grp:Text;
    address:Text;
    prin:Principal;
  };

  var patient_reg:[PatientRegistration] = [];

  public func Patient_Registration_function(det:PatientRegistration):async Text{
    patient_reg:= Array.append<PatientRegistration>(patient_reg , [det]);
    return "OK";
  };
  public shared query func getPatientDetails(prin:Principal): async ?PatientRegistration{
    return Array.find<PatientRegistration>(patient_reg , func x=x.prin == prin);
  };

  public func DeletePatientDetails():async Text {
    patient_reg:= [];
    return "Patient Data Deleted";
  };

  public type PharmacistRegistration = {
    name :Text;
    email:Text;
    pharmacy_license_number : Text;
    pharmacy_name:Text;
    pharmacy_address:Text;
    prin:Principal;
  };

  var pharm_reg:[PharmacistRegistration] = [];
  public func getPharmacistRegistartion(det:PharmacistRegistration): async Text {
    pharm_reg:= Array.append<PharmacistRegistration>(pharm_reg , [det]);
    return "OK";
  };

  public shared query func getPharmacistdetails(prin:Principal): async ?PharmacistRegistration{
    return Array.find<PharmacistRegistration>(pharm_reg , func x=x.prin == prin);
  };

  public func delete_Pharmacist_Details():async Text {
    patient_reg:= [];
    return "Patient Data Deleted";
  };

  public type PrescriptionDetails = {
    doctor_id:Principal;
    patient_id:Principal;
    diagnosis:Text;
    medicines:Text;
    additional_notes:Text;
    date:Text;
    doc_nm:Text;
  };

  var prescriptions:[PrescriptionDetails] = [];

  public func Prescription(pres:PrescriptionDetails): async Text {
    prescriptions:= Array.append<PrescriptionDetails>(prescriptions , [pres]);
    return"OK";
  };

  public shared query func getPresecriptions(patient_id:Principal) : async [PrescriptionDetails]{
    return Array.filter<PrescriptionDetails>(prescriptions , func x = x.patient_id == patient_id);
  };
  public shared query func getdate(patient_id:Principal) : async Text{
    var answer =  Array.find<PrescriptionDetails>(prescriptions , func x = x.patient_id == patient_id);
    switch(answer) {
      case(?found) { 
        return found.date;
       };
      case(null) { 
        return "not ok";
       };
    };
  };

  

};
  
