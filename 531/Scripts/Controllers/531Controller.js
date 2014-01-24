angular.module('fiveThreeOneModule', ['LocalStorageModule'])
.controller('fiveThreeOneController', [
      '$scope',
      'localStorageService',
       function ($scope, localStorageService) {
           $scope.removeOutdatedDataFromLocalStorage = function () {
               var storedPlates = this.storedPlates();
               if (storedPlates != undefined
                   && storedPlates[0].measurementUnit == undefined)
                   localStorageService.remove('availablePlates');
               var storedMainLifts = this.storedMainLifts();
               if (storedMainLifts != undefined
                   && this.accessoryWorkTemplatesHaveBeenChanged(storedMainLifts))
                   this.fixAccessoryExcercisesInTheTemplate(storedMainLifts);
           };

           $scope.measurementUnits = [
               "kg",
               "lbs"
           ];

           $scope.selectedMeasurementUnit = "kg";

           $scope.fixAccessoryExcercisesInTheTemplate = function (storedMainLifts) {
               for (var mainLiftIndex = 0; mainLiftIndex < storedMainLifts.length; mainLiftIndex++) {
                   var mainLift = this.mainLifts[mainLiftIndex]
                   var storedMainLift = storedMainLifts[mainLiftIndex];
                   storedMainLift.accessoryWorkPlanTemplates = mainLift.accessoryWorkPlanTemplates;
               }
               this.mainLifts = storedMainLifts;
               this.saveDataToLocalStorage();
           };

           $scope.accessoryWorkTemplatesHaveBeenChanged = function (storedMainLifts) {
               for (var mainLiftIndex = 0; mainLiftIndex < this.mainLifts.length; mainLiftIndex++) {
                   var mainLift = this.mainLifts[mainLiftIndex];
                   var storedMainLift = storedMainLifts[mainLiftIndex];
                   if (mainLift.accessoryWorkPlanTemplates.length != storedMainLift.accessoryWorkPlanTemplates.length)
                       return true;
                   else {
                       for (var accessoryWorkTemplateIndex = 0; accessoryWorkTemplateIndex < mainLift.accessoryWorkPlanTemplates.length; accessoryWorkTemplateIndex++) {
                           var accessoryWorkTemplate = mainLift.accessoryWorkPlanTemplates[accessoryWorkTemplateIndex];
                           var storedAccessoryWorkTemplate = storedMainLift.accessoryWorkPlanTemplates[accessoryWorkTemplateIndex];
                           if (JSON.stringify(accessoryWorkTemplate) !== JSON.stringify(storedAccessoryWorkTemplate))
                               return true;
                       }
                   }
               }
               return false;
           };

           $scope.accessoryWorkPlanTemplates = [
               "Boring but big",
               "The Triumvirate",
               "I'm not doing Jack shit",
               "Bodyweight"
           ];

           $scope.storedSelectedMeasurementUnit = function () {
               var selectedMeasurementUnit = null;
               if (localStorageService.isSupported)
                   selectedMeasurementUnit = localStorageService.get('selectedMeasurementUnit');
               return selectedMeasurementUnit;
           };

           $scope.storedMainLifts = function () {
               var mainLifts = null;
               if (localStorageService.isSupported)
                   mainLifts = localStorageService.get('mainLifts');
               return mainLifts;
           };

           $scope.storedPlates = function () {
               var availablePlates = null;
               if (localStorageService.isSupported)
                   availablePlates = localStorageService.get('availablePlates');
               return availablePlates;
           };

           $scope.storedSelectedAccessoryWorkTemplate = function () {
               var selectedAccessoryWorkTemplate = null;
               if (localStorageService.isSupported)
                   selectedAccessoryWorkTemplate = localStorageService.get('selectedAccessoryWorkTemplate');
               return selectedAccessoryWorkTemplate;
           };

           $scope.saveDataToLocalStorage = function () {
               if (localStorageService.isSupported) {
                   localStorageService.add('mainLifts', this.mainLifts);
                   localStorageService.add('availablePlates', this.availablePlates);
                   localStorageService.add('selectedAccessoryWorkTemplate', this.selectedAccessoryWorkTemplate);
                   localStorageService.add('selectedMeasurementUnit', this.selectedMeasurementUnit);
               }
           };

           $scope.loadFromStorage = function () {
               this.removeOutdatedDataFromLocalStorage();

               var storedMainLifts = this.storedMainLifts();
               if (storedMainLifts != undefined)
                   this.mainLifts = storedMainLifts;

               var storedPlates = this.storedPlates();
               if (storedPlates != undefined)
                   this.availablePlates = storedPlates;

               var storedSelectedAccessoryWorkTemplate = this.storedSelectedAccessoryWorkTemplate();
               if (storedSelectedAccessoryWorkTemplate != undefined)
                   this.selectedAccessoryWorkTemplate = storedSelectedAccessoryWorkTemplate;

               var storedSelectedMeasurementUnit = this.storedSelectedMeasurementUnit();
               if (storedSelectedMeasurementUnit != undefined)
                   this.selectedMeasurementUnit = storedSelectedMeasurementUnit;
           };

           $scope.mainLifts = [
                       {
                           name: 'Military press',
                           shouldEstimateOneRepMax: false,
                           maxReps: null,
                           maxWeight: null,
                           oneRepMax: null,
                           ninetyPercentOfOneRepMax: 0,
                           cycleWeights: new Array(),
                           accessoryWorkExcercises: new Array(),
                           accessoryWorkPlanTemplates: [
                               {
                                   name: "Boring but big",
                                   excercises: [
                                       {
                                           name: "Military press",
                                           sets: 5,
                                           reps: 10
                                       },
                                       {
                                           name: "Chin ups",
                                           sets: 5,
                                           reps: 10
                                       }
                                   ]
                               },
                               {
                                   name: "The Triumvirate",
                                   excercises: [
                                       {
                                           name: "Chest dips",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "Chin ups",
                                           sets: 5,
                                           reps: 10
                                       }
                                   ]
                               },
                               {
                                   name: "I'm not doing Jack shit",
                                   excercises: null
                               },
                               {
                                   name: "Bodyweight",
                                   excercises: [
                                       {
                                           name: "Chin ups",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "Chest dips",
                                           sets: 5,
                                           reps: 15
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           name: 'Deadlift',
                           shouldEstimateOneRepMax: false,
                           maxReps: null,
                           maxWeight: null,
                           oneRepMax: null,
                           ninetyPercentOfOneRepMax: 0,
                           cycleWeights: new Array(),
                           accessoryWorkExcercises: new Array(),
                           accessoryWorkPlanTemplates: [
                               {
                                   name: "Boring but big",
                                   excercises: [
                                       {
                                           name: "Deadlift",
                                           sets: 5,
                                           reps: 10
                                       },
                                       {
                                           name: "Hanging leg raises",
                                           sets: 5,
                                           reps: 15
                                       }
                                   ]
                               },
                               {
                                   name: "The Triumvirate",
                                   excercises: [
                                       {
                                           name: "Goodmornings",
                                           sets: 5,
                                           reps: 12
                                       },
                                       {
                                           name: "Hanging leg raises",
                                           sets: 5,
                                           reps: 15
                                       }
                                   ]
                               },
                               {
                                   name: "I'm not doing Jack shit",
                                   excercises: null
                               },
                               {
                                   name: "Bodyweight",
                                   excercises: [
                                       {
                                           name: "Glute ham raises",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "Hanging leg raises",
                                           sets: 5,
                                           reps: 15
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           name: 'Bench press',
                           shouldEstimateOneRepMax: false,
                           maxReps: null,
                           maxWeight: null,
                           oneRepMax: null,
                           ninetyPercentOfOneRepMax: 0,
                           cycleWeights: new Array,
                           accessoryWorkExcercises: new Array(),
                           accessoryWorkPlanTemplates: [
                               {
                                   name: "Boring but big",
                                   excercises: [
                                       {
                                           name: "Bench press",
                                           sets: 5,
                                           reps: 10
                                       },
                                       {
                                           name: "One arm dumbbell row",
                                           sets: 5,
                                           reps: 10
                                       }
                                   ]
                               },
                               {
                                   name: "The Triumvirate",
                                   excercises: [
                                       {
                                           name: "Dumbbell bench press",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "One arm dumbbell row",
                                           sets: 5,
                                           reps: 10
                                       }
                                   ]
                               },
                               {
                                   name: "I'm not doing Jack shit",
                                   excercises: null
                               },
                               {
                                   name: "Bodyweight",
                                   excercises: [
                                       {
                                           name: "Chin ups",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "Pushups",
                                           sets: 5,
                                           reps: 15
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           name: 'Back squat',
                           shouldEstimateOneRepMax: false,
                           maxReps: null,
                           maxWeight: null,
                           oneRepMax: null,
                           ninetyPercentOfOneRepMax: 0,
                           cycleWeights: new Array(),
                           accessoryWorkExcercises: new Array(),
                           accessoryWorkPlanTemplates: [
                               {
                                   name: "Boring but big",
                                   excercises: [
                                       {
                                           name: "Back squat",
                                           sets: 5,
                                           reps: 10
                                       },
                                       {
                                           name: "Leg curls",
                                           sets: 5,
                                           reps: 10
                                       }
                                   ]
                               },
                               {
                                   name: "The Triumvirate",
                                   excercises: [
                                       {
                                           name: "Leg press",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "Leg curls",
                                           sets: 5,
                                           reps: 10
                                       }
                                   ]
                               },
                               {
                                   name: "I'm not doing Jack shit",
                                   excercises: null
                               },
                               {
                                   name: "Bodyweight",
                                   excercises: [
                                       {
                                           name: "One leg squats",
                                           sets: 5,
                                           reps: 15
                                       },
                                       {
                                           name: "Sit ups",
                                           sets: 5,
                                           reps: 15
                                       }
                                   ]
                               }
                           ]
                       }
           ];

           $scope.selectedAccessoryWorkTemplate = "I'm not doing Jack shit";

           $scope.loadAccessoryWorkTemplate = function () {
               for (var mainLiftIndex = 0; mainLiftIndex < this.mainLifts.length; mainLiftIndex++) {
                   var mainLift = this.mainLifts[mainLiftIndex];
                   mainLift.accessoryWorkExcercises = new Array();
                   var template = this.getAccessoryWorkTemplate(mainLift, this.selectedAccessoryWorkTemplate);
                   if (template.excercises != undefined)
                       for (var accessoryExcerciseIndex = 0; accessoryExcerciseIndex < template.excercises.length; accessoryExcerciseIndex++) {
                           var excercise = template.excercises[accessoryExcerciseIndex];
                           var excerciseCopy = {
                               name: excercise.name,
                               sets: excercise.sets,
                               reps: excercise.reps
                           };
                           mainLift.accessoryWorkExcercises.push(excerciseCopy);
                       }
               }
               this.saveDataToLocalStorage();
           };

           $scope.getAccessoryWorkTemplate = function (mainLift, selectedAccessoryWorkTemplate) {
               var correspondingTemplates = $.grep(mainLift.accessoryWorkPlanTemplates, function (item) {
                   return item.name == selectedAccessoryWorkTemplate;
               });
               return correspondingTemplates[0];
           };

           $scope.addAccessoryWorkExcercise = function (mainLift) {
               mainLift.accessoryWorkExcercises.push({
                   id: identifierGenerator.newIdentifier(),
                   name: null,
                   sets: null,
                   reps: null
               });
               this.saveDataToLocalStorage();
           };

           $scope.removeAccessoryWorkExcercise = function (mainLift, accessoryWorkExcercise) {
               var accessoryWorkExcercisesToRemove = $.grep(mainLift.accessoryWorkExcercises, function (item) {
                   return item.id == accessoryWorkExcercise.id;
               });

               mainLift.accessoryWorkExcercises.splice(
                   mainLift.accessoryWorkExcercises.indexOf(accessoryWorkExcercisesToRemove[0]), 1);
               this.saveDataToLocalStorage();
           };

           $scope.getAvailablePlates = function () {
               var availablePlates = $.grep(this.availablePlates, function (item) {
                   return item.measurementUnit == $scope.selectedMeasurementUnit;
               });
               return availablePlates;
           };

           $scope.availablePlates = [
               {
                   weight: 50,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 25,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 20,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 15,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 10,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 5,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 2.5,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 1.25,
                   measurementUnit: "kg",
                   usedForCalculations: true
               },
               {
                   weight: 110,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 100,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 55,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 45,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 35,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 25,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 10,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 5,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               },
               {
                   weight: 2.5,
                   measurementUnit: "lbs",
                   usedForCalculations: true
               }
           ];

           $scope.atLeastOnePlateCanBeUsedForCalculations = function () {
               var platesUsedForCalculations = $.grep(this.getAvailablePlates(), function (item) {
                   return item.usedForCalculations;
               });

               return platesUsedForCalculations != undefined
                   && platesUsedForCalculations.length > 0;
           };

           $scope.addPlateToCalculation = function (availablePlate) {
               availablePlate.usedForCalculations = true;
               this.saveDataToLocalStorage();
           };

           $scope.removePlateFromCalculation = function (availablePlate) {
               availablePlate.usedForCalculations = false;
               this.saveDataToLocalStorage();
           };

           $scope.barbellWeight = {
               inKg: 20,
               inLbs: 45,
           };

           $scope.getBarbellWeight = function () {
               var weight = 0;
               if (this.selectedMeasurementUnit == "kg")
                   weight = this.barbellWeight.inKg;
               else if (this.selectedMeasurementUnit == "lbs")
                   weight = this.barbellWeight.inLbs;
               return weight;
           };

           $scope.calculated = false;

           $scope.mainLiftCycles = [
               [
                   {
                       reps: 5,
                       canDoMoreReps: false,
                       percentages: 65
                   },
                   {
                       reps: 5,
                       canDoMoreReps: false,
                       percentages: 75
                   },
                   {
                       reps: 5,
                       canDoMoreReps: true,
                       percentages: 85
                   }
               ],
               [
                   {
                       reps: 3,
                       canDoMoreReps: false,
                       percentages: 70
                   },
                   {
                       reps: 3,
                       canDoMoreReps: false,
                       percentages: 80
                   },
                   {
                       reps: 3,
                       canDoMoreReps: true,
                       percentages: 90
                   }
               ],
               [
                   {
                       reps: 5,
                       canDoMoreReps: false,
                       percentages: 75
                   },
                   {
                       reps: 3,
                       canDoMoreReps: false,
                       percentages: 85
                   },
                   {
                       reps: 1,
                       canDoMoreReps: true,
                       percentages: 95
                   }
               ],
               [
                   {
                       reps: 5,
                       canDoMoreReps: false,
                       percentages: 40
                   },
                   {
                       reps: 5,
                       canDoMoreReps: false,
                       percentages: 50
                   },
                   {
                       reps: 5,
                       canDoMoreReps: false,
                       percentages: 60
                   }
               ]
           ];

           $scope.calculateEstimatedOneRepMax = function (mainLift) {
               var oneRepMax = 0;
               if (mainLift.maxReps != undefined
                   && mainLift.maxWeight != undefined) {
                   oneRepMax = parseFloat(mainLift.maxReps * mainLift.maxWeight * 0.0333 + mainLift.maxWeight).toFixed(1);
               }
               mainLift.oneRepMax = oneRepMax;
               this.saveDataToLocalStorage();
           };

           $scope.calculateNinetyPercentOfOneRepMax = function (mainLift) {
               mainLift.ninetyPercentOfOneRepMax = 0;
               if (mainLift.oneRepMax != undefined)
                   mainLift.ninetyPercentOfOneRepMax = parseFloat(mainLift.oneRepMax * 0.9).toFixed(1);
               return mainLift.ninetyPercentOfOneRepMax;
           };

           $scope.estimateOneRepMax = function (mainLift) {
               mainLift.shouldEstimateOneRepMax = true;
               mainLift.oneRepMax = null;
               mainLift.ninetyPercentOfOneRepMax = null;
               this.calculateEstimatedOneRepMax(mainLift);
               this.saveDataToLocalStorage();
           };

           $scope.enterOneRepMax = function (mainLift) {
               mainLift.shouldEstimateOneRepMax = false;
               mainLift.oneRepMax = null;
               mainLift.ninetyPercentOfOneRepMax = null;
               this.saveDataToLocalStorage();
           };

           $scope.isFormValid = function () { //Conditional validation does not seem to work- all validators are valid but the form itself is not :(. This is a workaround.
               return this.areAllMainLiftsValid()
                      && this.atLeastOnePlateCanBeUsedForCalculations();
           };

           $scope.areAllMainLiftsValid = function () {
               var invalidLifts = $.grep(this.mainLifts, function (item) {
                   return item.ninetyPercentOfOneRepMax == null
                       || (item.ninetyPercentOfOneRepMax != null && item.ninetyPercentOfOneRepMax <= 0);
               });
               return invalidLifts.length == 0;
           };

           $scope.recalculateMesocycle = function () {
               this.calculated = false;
               this.clearMainLifts();
           };

           $scope.clearMainLifts = function () {
               for (var mainLiftIndex = 0; mainLiftIndex < this.mainLifts.length; mainLiftIndex++) {
                   var mainLift = this.mainLifts[mainLiftIndex];
                   mainLift.cycleWeights = new Array();
               }
           };

           $scope.calculateMesocycle = function () {
               this.clearMainLifts();
               for (var mainLiftIndex = 0; mainLiftIndex < this.mainLifts.length; mainLiftIndex++) {
                   for (var mainLiftCycleIndex = 0; mainLiftCycleIndex < this.mainLiftCycles.length; mainLiftCycleIndex++) {
                       var mainLiftCycle = this.mainLiftCycles[mainLiftCycleIndex];
                       var mainLift = this.mainLifts[mainLiftIndex];
                       var cycleWeights = {
                           cycle: mainLiftCycleIndex + 1,
                           setWeights: new Array()
                       };
                       for (var setIndex = 0; setIndex < mainLiftCycle.length; setIndex++) {
                           var set = mainLiftCycle[setIndex];
                           var setWeight = {
                               set: setIndex + 1,
                               reps: set.reps,
                               percentages: set.percentages,
                               canDoMoreReps: set.canDoMoreReps,
                               weight: this.calculateWeight(mainLift, set)
                           };
                           cycleWeights.setWeights.push(setWeight);
                       }
                       mainLift.cycleWeights.push(cycleWeights);
                   }
               }
               this.calculated = true;
               this.saveDataToLocalStorage();
           };

           $scope.calculateWeight = function (mainLift, set) {
               var weight = {
                   rawWeight: Number((mainLift.ninetyPercentOfOneRepMax / 100 * set.percentages).toFixed(1)),
                   weightToUse: 0,
                   platesVisible: false,
                   platesToUse: new Array()
               };

               var barbellWeight = this.getBarbellWeight();
               if (weight.rawWeight > barbellWeight)
                   weight.weightToUse = barbellWeight;

               var rawWeightWithoutBarbell = weight.rawWeight - barbellWeight;

               var availablePlates = this.getAvailablePlates();
               for (var availablePlateIndex = 0; availablePlateIndex < availablePlates.length; availablePlateIndex++) {
                   var availablePlate = availablePlates[availablePlateIndex];
                   if (availablePlate.usedForCalculations) {
                       var weightOnBothSides = 2 * availablePlate.weight;
                       do {
                           if (rawWeightWithoutBarbell - weightOnBothSides >= 0) {
                               var alreadyAddedPlate = this.getAlreadyAddedPlate(weight, availablePlate);

                               if (alreadyAddedPlate != undefined) {
                                   alreadyAddedPlate.plateCount += 2;
                               }
                               else {
                                   weight.platesToUse.push({ plateWeight: availablePlate.weight, plateCount: 2 });
                                   weight.platesVisible = true;
                               }

                               weight.weightToUse += weightOnBothSides;
                               rawWeightWithoutBarbell -= weightOnBothSides;
                           }
                       } while (rawWeightWithoutBarbell - weightOnBothSides > 0)
                   }
               }

               return weight;
           };

           $scope.getAlreadyAddedPlate = function (weight, availablePlate) {
               var alreadyAddedPlate = null;
               var alreadyAddedPlates = $.grep(weight.platesToUse, function (item) {
                   return item.plateWeight == availablePlate.weight;
               });
               if (alreadyAddedPlates.length > 0)
                   alreadyAddedPlate = alreadyAddedPlates[0];
               return alreadyAddedPlate;
           };

           $scope.printableVersion = false;

           $scope.enablePrintableVersion = function () {
               this.printableVersion = true;
           };

           $scope.disablePrintableVersion = function () {
               this.printableVersion = false;
           };

           $scope.printPage = function () {
               window.print();
               window.location.href = window.location.href; //workaround to call print dialog
           };
       }
]);