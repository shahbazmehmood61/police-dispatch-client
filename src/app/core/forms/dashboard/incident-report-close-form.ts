import {
  FormGroup,
  FormBuilder,
  Validators,
  MaxLengthValidator,
  FormArray,
} from "@angular/forms";
import { onlyNumbers } from "../../constants/string-constants";
import { AuthService } from "../../services/auth.service";
import { SearchService } from "../../services/search.service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IncidentReportCloseForm {
  officerID: any;
  // secondPage;
  // thirdPage;
  firstPageForm = {
    email: [{ value: null, disabled: true }],
    telephoneNo: [{ value: null, disabled: true }, Validators.minLength(14)],
    officerId: [{ value: this.officerID, disabled: true }],
    victimId: [{ value: this.searchService.victimID, disabled: true }],
    // status: [{ value: null, disabled: true }],
    firstName: [{ value: null, disabled: true }],
    middleInitial: [{ value: null, disabled: true }],
    lastName: [{ value: null, disabled: true }],
    secondLastName: [{ value: null, disabled: true }],

    // Auto get
    dateOfCall: [{ value: null, disabled: true }],
    timeOfCall: [{ value: null, disabled: true }],
    incidentDate: [{ value: null, disabled: true }],
    incidentTime: [{ value: null, disabled: true }],
    locationOfIncident: [{ value: null, disabled: true }],
    levelsOfAggressiveness: [{ value: null, disabled: true }],
    officerReceivingCall: [{ value: null, disabled: true }],
    patrolDispatchTime: [{ value: null, disabled: true }],
    dispatchedPatrol: [{ value: null, disabled: true }],

    // para
    peopleInvolved: [{ value: null, disabled: true }],
    necessaryResources: [{ value: null, disabled: true }],
    incidentNarrative: [{ value: null, disabled: true }],
  }
  secondPage = {
    headingRow: this.fb.group({
      ori: "",
      incident: "",
      initialReportType: false,
      supplementReportType: false,
      unfoundedStatus: false,
      clearedByStatus: false,
      arrestStatus: false,
      exceptionalStatus: false,
      offernderDeathStatus: false,
      refusalTrailStatus: false,
      extradicionDeniedStatus: false,
      negotiateCollaborateStatus: false,
      minorStatus: false,
      noApplicaStatus: false,
    }),
    crime: this.fb.group({
      complainantSurName: null,
      complainantName: null,
      complainantmiddleName: null,
      ss: null,
      homeTelephone: [null, Validators.minLength(14)],
      direction: null,
      jobTelephone: [null, Validators.minLength(14)],
      incidentPlace: null,
      crimeUcr: this.fb.array([this.addCrimes()]),
      ifMotivatedOfPrejudice: this.fb.array([this.motivatedOf()]),
      antiWhite: false,
      antiBlack: false,
      antiAmerican: false,
      antiAsiatic: false,
      antiMultiracial: false,
      antiArab: false,
      antiHispanic: false,
      antiOtoroEthnic: false,
      antiJwe: false,
      antiCatholic: false,
      antiProtestant: false,
      antiMuslim: false,
      antiOtherReligion: false,
      multiReligion: false,
      antiAtheism: false,
      homosexualMen: false,
      homosexualWomen: false,
      antiHomosexual: false,
      antiHeterosexual: false,
      antiBisexual: false,
      ifDifferentFromCrime: this.fb.array([this.fb.control("")]),
      crimeTried1: false,
      crimeTried2: false,
      crimeTried3: false,
      crimeFull1: false,
      crimeFull2: false,
      crimeFull3: false,
      offenderUseAlcohal: false,
      offenderUseDrugs: false,
      offenderUseComputerEquip: false,
      doesNotApply: false,
      locatedAllanados: null,
      robberyByForce: false,
      robberyWithoutForce: false,
      airBustrainterminal: false,
      bank: false,
      nightClub: false,
      churchTemple: false,
      commercialOfficeBuilding: false,
      constructionSite: false,
      hardwareStore: false,
      departmentStore: false,
      pharmacyHospital: false,
      fieldForest: false,
      govtPublicBuilding: false,
      superMarketFoodStore: false,
      roadStreetAlley: false,
      hotelMotel: false,
      jailPrison: false,
      lakeWaterway: false,
      liquorStore: false,
      parkingGarage: false,
      storageRentalCenter: false,
      residenceHome: false,
      restaurant: false,
      university: false,
      fuelStation: false,
      specializedStore: false,
      other: false,
    }),
    victim: this.fb.group({
      buyReceive: false,
      distributeSell: false,
      protestPromoteAssist: false,
      transportImport: false,
      cultivateManufacture: false,
      exploitChildren: false,
      ownHide: false,
      useConsume: false,
      firearm: false,
      gun: false,
      rifle: false,
      shotGun: false,
      anotherFirearm: false,
      knife: false,
      shappenedObject: false,
      motorVehicle: false,
      personalWeapon: false,
      poison: false,
      explosives: false,
      fire: false,
      narcoticDrug: false,
      suffocation: false,
      other: false,
      unknown: false,
      none: false,
      victimFirstName: null,
      victimLastName: null,
      victimMiddleName: null,
      homePhone: [null, Validators.minLength(14)],
      address: null,
      individual: false,
      deal: false,
      financial: false,
      government: false,
      religious: false,
      society: false,
      otherVictimtype: false,
      unknownVictimType: false,
      white: false,
      black: false,
      americanIndian: false,
      asian: false,
      hawaiiana: false,
      raceUnknown: false,
      male: false,
      female: false,
      sexOther: false,
      resident: false,
      nonResident: false,
      residentOther: false,
      hispanic: false,
      notHispanic: false,
      otherGroup: false,
      age: null,
      dateOfBirth: null,
      numOfVictims: null,
      discussion: false,
      aggressionAgaintPolice: false,
      drugSales: false,
      organizedCrime: false,
      juvenileGang: false,
      fightBtwLovers: false,
      euthanasia: false,
      otherCrimeInvolve: false,
      otherCircumstance: false,
      unknownCircumstance: false,
      injuryNone: false,
      bones: false,
      possibleInjuriesInternal: false,
      ripSevere: false,
      minorInjury: false,
      majorInjury: false,
      wasteOfTeeth: false,
      wasteOfKnowledge: false,
      victimRelatedCrimes: this.fb.array([this.fb.control("")]),
      spouse: false,
      spouseByAggrement: false,
      father: false,
      brother: false,
      son: false,
      grandfather: false,
      grandchild: false,
      politcalRelative: false,
      stepFatherMother: false,
      stepson: false,
      stepbrother: false,
      anotherFamily: false,
      known: false,
      friend: false,
      neighbor: false,
      babysitter: false,
      boyfriend: false,
      sonOfBG: false,
      homosexualRelative: false,
      exSpouse: false,
      employee: false,
      patron: false,
      otherKnown: false,
      unKnown: false,
      victimWasOffender: false,
      unknownRelationship: false,
    }),
  }
  thirdPage = {
    goods: this.fb.group({
      noneCode: null,
      burnedCode: null,
      counterfietCode: null,
      damagedCode: null,
      recoveredCode: null,
      seizedCode: null,
      stoledCode: null,
      unknownCode: null,
      noneQuantity: null,
      burnedQuantity: null,
      counterfietQuantity: null,
      damagedQuantity: null,
      recoveredQuantity: null,
      seizedQuantity: null,
      stoledQuantity: null,
      unknownQuantity: null,
      noneDescription: null,
      burnedDescription: null,
      counterfietDescription: null,
      damagedDescription: null,
      recoveredDescription: null,
      seizedDescription: null,
      stoledDescription: null,
      unknownDescription: null,
      noneValue: null,
      burnedValue: null,
      counterfietValue: null,
      damagedValue: null,
      recoveredValue: null,
      seizedValue: null,
      stoledValue: null,
      unknownValue: null,
      noneDate: null,
      burnedDate: null,
      counterfietDate: null,
      damagedDate: null,
      recoveredDate: null,
      seizedDate: null,
      stoledDate: null,
      unknownDate: null,
      aircraft: false,
      alcohal: false,
      autoMobiles: false,
      bikes: false,
      buses: false,
      clothes: false,
      equipmentsPrograms: false,
      consumeableGoods: false,
      creditDebitCard: false,
      drugsNarcotics: false,
      drugNarcoticsTeam: false,
      agriculcureEquipment: false,
      firearms: false,
      playingEquipment: false,
      structuresCommercial: false,
      structuresIndustrial: false,
      heavyEquipments: false,
      householdGoods: false,
      praciousMetals: false,
      won: false,
      goods: false,
      money: false,
      negotableInstruments: false,
      nonNegotableInstruments: false,
      officeTeams: false,
      otherMotorVehical: false,
      walletBag: false,
      radioTelevision: false,
      recordingAudioVisual: false,
      recreationVehicel: false,
      structurefamilyHousing: false,
      structureOtherHousing: false,
      publicCommunityStructure: false,
      structureStorage: false,
      structureOther: false,
      electricalTools: false,
      trucks: false,
      vehicelParts: false,
      boats: false,
      other: false,
    }),
    offender: this.fb.group({
      numOfCriminals: null,
      offendersRecord: this.fb.array([this.offenderRecord()]),
    }),
    arrested: this.fb.group({
      numOfDetainee: null,
      indicatorMultiple: false,
      countDetainee: false,
      doesNotApply: false,
      criminalName: null,
      socialSecurity: null,
      address: null,
      age: null,
      male: false,
      female: false,
      unknown: false,
      white: false,
      black: false,
      americanIndian: false,
      asian: false,
      hawaiiana: false,
      unknownRace: false,
      dateOfBirth: null,
      hispanic: false,
      notHispanic: false,
      unknownGroup: false,
      resident: false,
      nonResident: false,
      unknownResident: false,
      notAssembled: false,
      firearm: false,
      pistol: false,
      rifle: false,
      shotGun: false,
      anotherFirearm: false,
      cuttingInstrument: false,
      mitten: false,
      inTheFact: false,
      afforementioned: false,
      takenUnderCustody: false,
      processInDepartment: false,
      recommendToAuthority: false,
      height: null,
      weight: null,
      eye: null,
      hair: null,
      numOfDetention: null,
      dateOfDetention: false,
      detentionCrimeCode: null,
    }),
    witness: this.fb.group({
      surName: null,
      firstName: null,
      middleName: null,
      address: null,
      residentialTelephone: [null, Validators.minLength(14)],
      workTelephone: [null, Validators.minLength(14)],
    }),
    firms: this.fb.group({
      complainant: null,
      date: null,
      preparedBy: null,
      licensePlate: null,
      preparedDate: null,
      supervisor: null,
      supervisorLicensePlate: null,
      supervisorDate: null,
      continueSupplement: false,
      completeDescription: null,
    })
  }
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public searchService: SearchService
  ) {
    this.officerID = this.authService.userInfo.uid;
  }

  incidentReportCloseForm: FormGroup;

  addCrimes() {
    return this.fb.group({
      crimeCode: null,
      incidentDate: null,
      incidentTime: null,
    });
  }

  addCrime() {
    const crime = this.incidentReportCloseForm.get('secondPage.crime.crimeUcr') as FormArray;
    crime.push(this.addCrimes());
  }

  removeCrime(i) {
    const crime = this.incidentReportCloseForm.get('secondPage.crime.crimeUcr') as FormArray;
    crime.removeAt(i);
    if (crime.length === 0) {
      crime.push(this.addCrimes());
    }
  }

  motivatedOf() {
    return this.fb.group({
      crimeName: null,
      oneMotivatedOfPrejudice: null,
      offenderName: null,
    });
  }

  addMotivatedOfPrejudice() {
    const motivated = this.incidentReportCloseForm.get('secondPage.crime.ifMotivatedOfPrejudice') as FormArray;
    motivated.push(this.motivatedOf());
  }

  removeMotivatedPrejudice(i) {
    const motivated = this.incidentReportCloseForm.get('secondPage.crime.ifMotivatedOfPrejudice') as FormArray;
    motivated.removeAt(i);
    if (motivated.length === 0) {
      motivated.push(this.motivatedOf());
    }
  }

  diffFromCrime() {
    const diff = this.incidentReportCloseForm.get('secondPage.crime.ifDifferentFromCrime') as FormArray;
    diff.push(this.fb.control(""));
  }

  removediffFromCrime(i) {
    const diff = this.incidentReportCloseForm.get('secondPage.crime.ifDifferentFromCrime') as FormArray;
    diff.removeAt(i);
    if (diff.length === 0) {
      diff.push(this.fb.control(""));
    }
  }

  victimRealtedCrime() {
    const crime = this.incidentReportCloseForm.get('secondPage.victim.victimRelatedCrimes') as FormArray;
    crime.push(this.fb.control(""));
  }

  removeVictimRealtedCrime(i) {
    const crime = this.incidentReportCloseForm.get('secondPage.victim.victimRelatedCrimes') as FormArray;
    crime.removeAt(i);
    if (crime.length === 0) {
      crime.push(this.fb.control(""));
    }
  }

  offenderRecord() {
    return this.fb.group({
      criminalName: null,
      socialSecurity: null,
      address: null,
      age: null,
      male: false,
      female: false,
      unknown: false,
      white: false,
      black: false,
      americanIndian: false,
      asian: false,
      hawaiiana: false,
      unknownRace: false,
      dateOfBirth: null,
      height: null,
      weight: null,
      eye: null,
      hair: null,
      clothes: null,
    });
  }

  addOffender() {
    const offender = this.incidentReportCloseForm.get('thirdPage.offender.offendersRecord') as FormArray;
    offender.push(this.offenderRecord());
  }

  removeOffender(i) {
    const offender = this.incidentReportCloseForm.get('thirdPage.offender.offendersRecord') as FormArray;
    offender.removeAt(i);
    if (offender.length === 0) {
      offender.push(this.offenderRecord());
    }
  }

  initForm() {
    return this.incidentReportCloseForm = this.fb.group({
      firstPage: this.fb.group({
        ...this.firstPageForm
      })
    })
  }

  // initForm() {
  //   return (this.incidentReportCloseForm = this.fb.group({
  //     email: [{ value: null, disabled: true }],
  //     telephoneNo: [{ value: null, disabled: true }, Validators.minLength(14)],
  //     officerId: [{ value: this.officerID, disabled: true }],
  //     victimId: [{ value: this.searchService.victimID, disabled: true }],
  //     status: [{ value: null, disabled: true }],
  //     firstName: [{ value: null, disabled: true }],
  //     middleInitial: [{ value: null, disabled: true }],
  //     lastName: [{ value: null, disabled: true }],
  //     secondLastName: [{ value: null, disabled: true }],

  //     // Auto get
  //     dateOfCall: [{ value: null, disabled: true }],
  //     timeOfCall: [{ value: null, disabled: true }],
  //     incidentDate: [{ value: null, disabled: true }],
  //     incidentTime: [{ value: null, disabled: true }],
  //     locationOfIncident: [{ value: null, disabled: true }],
  //     levelsOfAggressiveness: [{ value: null, disabled: true }],
  //     officerReceivingCall: [{ value: null, disabled: true }],
  //     patrolDispatchTime: [{ value: null, disabled: true }],
  //     dispatchedPatrol: [{ value: null, disabled: true }],

  //     // para
  //     peopleInvolved: [{ value: null, disabled: true }],
  //     necessaryResources: [{ value: null, disabled: true }],
  //     incidentNarrative: [{ value: null, disabled: true }],

  //     // close incident heading row
  //     headingRow: this.fb.group({
  //       ori: null,
  //       incident: null,
  //       initialReportType: false,
  //       supplementReportType: false,
  //       unfoundedStatus: false,
  //       clearedByStatus: false,
  //       arrestStatus: false,
  //       exceptionalStatus: false,
  //       offernderDeathStatus: false,
  //       refusalTrailStatus: false,
  //       extradicionDeniedStatus: false,
  //       negotiateCollaborateStatus: false,
  //       minorStatus: false,
  //       noApplicaStatus: false,
  //     }),
  //     crime: this.fb.group({
  //       complainantSurName: null,
  //       complainantName: null,
  //       complainantmiddleName: null,
  //       ss: null,
  //       homeTelephone: [null, Validators.minLength(14)],
  //       direction: null,
  //       jobTelephone: [null, Validators.minLength(14)],
  //       incidentPlace: null,
  //       crimeUcr: this.fb.array([this.addCrimes()]),
  //       ifMotivatedOfPrejudice: this.fb.array([this.motivatedOf()]),
  //       antiWhite: false,
  //       antiBlack: false,
  //       antiAmerican: false,
  //       antiAsiatic: false,
  //       antiMultiracial: false,
  //       antiArab: false,
  //       antiHispanic: false,
  //       antiOtoroEthnic: false,
  //       antiJwe: false,
  //       antiCatholic: false,
  //       antiProtestant: false,
  //       antiMuslim: false,
  //       antiOtherReligion: false,
  //       multiReligion: false,
  //       antiAtheism: false,
  //       homosexualMen: false,
  //       homosexualWomen: false,
  //       antiHomosexual: false,
  //       antiHeterosexual: false,
  //       antiBisexual: false,
  //       ifDifferentFromCrime: this.fb.array([this.fb.control("")]),
  //       crimeTried1: false,
  //       crimeTried2: false,
  //       crimeTried3: false,
  //       crimeFull1: false,
  //       crimeFull2: false,
  //       crimeFull3: false,
  //       offenderUseAlcohal: false,
  //       offenderUseDrugs: false,
  //       offenderUseComputerEquip: false,
  //       doesNotApply: false,
  //       locatedAllanados: null,
  //       robberyByForce: false,
  //       robberyWithoutForce: false,
  //       airBustrainterminal: false,
  //       bank: false,
  //       nightClub: false,
  //       churchTemple: false,
  //       commercialOfficeBuilding: false,
  //       constructionSite: false,
  //       hardwareStore: false,
  //       departmentStore: false,
  //       pharmacyHospital: false,
  //       fieldForest: false,
  //       govtPublicBuilding: false,
  //       superMarketFoodStore: false,
  //       roadStreetAlley: false,
  //       hotelMotel: false,
  //       jailPrison: false,
  //       lakeWaterway: false,
  //       liquorStore: false,
  //       parkingGarage: false,
  //       storageRentalCenter: false,
  //       residenceHome: false,
  //       restaurant: false,
  //       university: false,
  //       fuelStation: false,
  //       specializedStore: false,
  //       other: false,
  //     }),
  //     victim: this.fb.group({
  //       buyReceive: false,
  //       distributeSell: false,
  //       protestPromoteAssist: false,
  //       transportImport: false,
  //       cultivateManufacture: false,
  //       exploitChildren: false,
  //       ownHide: false,
  //       useConsume: false,
  //       firearm: false,
  //       gun: false,
  //       rifle: false,
  //       shotGun: false,
  //       anotherFirearm: false,
  //       knife: false,
  //       shappenedObject: false,
  //       motorVehicle: false,
  //       personalWeapon: false,
  //       poison: false,
  //       explosives: false,
  //       fire: false,
  //       narcoticDrug: false,
  //       suffocation: false,
  //       other: false,
  //       unknown: false,
  //       none: false,
  //       victimFirstName: null,
  //       victimLastName: null,
  //       victimMiddleName: null,
  //       homePhone: [null, Validators.minLength(14)],
  //       address: null,
  //       individual: false,
  //       deal: false,
  //       financial: false,
  //       government: false,
  //       religious: false,
  //       society: false,
  //       otherVictimtype: false,
  //       unknownVictimType: false,
  //       white: false,
  //       black: false,
  //       americanIndian: false,
  //       asian: false,
  //       hawaiiana: false,
  //       raceUnknown: false,
  //       male: false,
  //       female: false,
  //       sexOther: false,
  //       resident: false,
  //       nonResident: false,
  //       residentOther: false,
  //       hispanic: false,
  //       notHispanic: false,
  //       otherGroup: false,
  //       age: null,
  //       dateOfBirth: null,
  //       numOfVictims: null,
  //       discussion: false,
  //       aggressionAgaintPolice: false,
  //       drugSales: false,
  //       organizedCrime: false,
  //       juvenileGang: false,
  //       fightBtwLovers: false,
  //       euthanasia: false,
  //       otherCrimeInvolve: false,
  //       otherCircumstance: false,
  //       unknownCircumstance: false,
  //       injuryNone: false,
  //       bones: false,
  //       possibleInjuriesInternal: false,
  //       ripSevere: false,
  //       minorInjury: false,
  //       majorInjury: false,
  //       wasteOfTeeth: false,
  //       wasteOfKnowledge: false,
  //       victimRelatedCrimes: this.fb.array([this.fb.control("")]),
  //       spouse: false,
  //       spouseByAggrement: false,
  //       father: false,
  //       brother: false,
  //       son: false,
  //       grandfather: false,
  //       grandchild: false,
  //       politcalRelative: false,
  //       stepFatherMother: false,
  //       stepson: false,
  //       stepbrother: false,
  //       anotherFamily: false,
  //       known: false,
  //       friend: false,
  //       neighbor: false,
  //       babysitter: false,
  //       boyfriend: false,
  //       sonOfBG: false,
  //       homosexualRelative: false,
  //       exSpouse: false,
  //       employee: false,
  //       patron: false,
  //       otherKnown: false,
  //       unKnown: false,
  //       victimWasOffender: false,
  //       unknownRelationship: false,
  //     }),
  //     goods: this.fb.group({
  //       noneCode: null,
  //       burnedCode: null,
  //       counterfietCode: null,
  //       damagedCode: null,
  //       recoveredCode: null,
  //       seizedCode: null,
  //       stoledCode: null,
  //       unknownCode: null,
  //       noneQuantity: null,
  //       burnedQuantity: null,
  //       counterfietQuantity: null,
  //       damagedQuantity: null,
  //       recoveredQuantity: null,
  //       seizedQuantity: null,
  //       stoledQuantity: null,
  //       unknownQuantity: null,
  //       noneDescription: null,
  //       burnedDescription: null,
  //       counterfietDescription: null,
  //       damagedDescription: null,
  //       recoveredDescription: null,
  //       seizedDescription: null,
  //       stoledDescription: null,
  //       unknownDescription: null,
  //       noneValue: null,
  //       burnedValue: null,
  //       counterfietValue: null,
  //       damagedValue: null,
  //       recoveredValue: null,
  //       seizedValue: null,
  //       stoledValue: null,
  //       unknownValue: null,
  //       noneDate: null,
  //       burnedDate: null,
  //       counterfietDate: null,
  //       damagedDate: null,
  //       recoveredDate: null,
  //       seizedDate: null,
  //       stoledDate: null,
  //       unknownDate: null,
  //       aircraft: false,
  //       alcohal: false,
  //       autoMobiles: false,
  //       bikes: false,
  //       buses: false,
  //       clothes: false,
  //       equipmentsPrograms: false,
  //       consumeableGoods: false,
  //       creditDebitCard: false,
  //       drugsNarcotics: false,
  //       drugNarcoticsTeam: false,
  //       agriculcureEquipment: false,
  //       firearms: false,
  //       playingEquipment: false,
  //       structuresCommercial: false,
  //       structuresIndustrial: false,
  //       heavyEquipments: false,
  //       householdGoods: false,
  //       praciousMetals: false,
  //       won: false,
  //       goods: false,
  //       money: false,
  //       negotableInstruments: false,
  //       nonNegotableInstruments: false,
  //       officeTeams: false,
  //       otherMotorVehical: false,
  //       walletBag: false,
  //       radioTelevision: false,
  //       recordingAudioVisual: false,
  //       recreationVehicel: false,
  //       structurefamilyHousing: false,
  //       structureOtherHousing: false,
  //       publicCommunityStructure: false,
  //       structureStorage: false,
  //       structureOther: false,
  //       electricalTools: false,
  //       trucks: false,
  //       vehicelParts: false,
  //       boats: false,
  //       other: false,
  //     }),
  //     offender: this.fb.group({
  //       numOfCriminals: null,
  //       offendersRecord: this.fb.array([this.offenderRecord()]),
  //     }),
  //     arrested: this.fb.group({
  //       numOfDetainee: null,
  //       indicatorMultiple: false,
  //       countDetainee: false,
  //       doesNotApply: false,
  //       criminalName: null,
  //       socialSecurity: null,
  //       address: null,
  //       age: null,
  //       male: false,
  //       female: false,
  //       unknown: false,
  //       white: false,
  //       black: false,
  //       americanIndian: false,
  //       asian: false,
  //       hawaiiana: false,
  //       unknownRace: false,
  //       dateOfBirth: null,
  //       hispanic: false,
  //       notHispanic: false,
  //       unknownGroup: false,
  //       resident: false,
  //       nonResident: false,
  //       unknownResident: false,
  //       notAssembled: false,
  //       firearm: false,
  //       pistol: false,
  //       rifle: false,
  //       shotGun: false,
  //       anotherFirearm: false,
  //       cuttingInstrument: false,
  //       mitten: false,
  //       inTheFact: false,
  //       afforementioned: false,
  //       takenUnderCustody: false,
  //       processInDepartment: false,
  //       recommendToAuthority: false,
  //       height: null,
  //       weight: null,
  //       eye: null,
  //       hair: null,
  //       numOfDetention: null,
  //       dateOfDetention: false,
  //       detentionCrimeCode: null,
  //     }),
  //     witness: this.fb.group({
  //       surName: null,
  //       firstName: null,
  //       middleName: null,
  //       address: null,
  //       residentialTelephone: [null, Validators.minLength(14)],
  //       workTelephone: [null, Validators.minLength(14)],
  //     }),
  //     // story: this.fb.group({
  //     //   completeDescription: null,
  //     // }),
  //     firms: this.fb.group({
  //       complainant: null,
  //       date: null,
  //       preparedBy: null,
  //       licensePlate: null,
  //       preparedDate: null,
  //       supervisor: null,
  //       supervisorLicensePlate: null,
  //       supervisorDate: null,
  //       continueSupplement: false,
  //       completeDescription: null,
  //     }),
  //   }));
  // }
}
