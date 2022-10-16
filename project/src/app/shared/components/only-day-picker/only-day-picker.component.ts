/**
 * 只有天 Picker - Shared Component
 */

 import { Component, Input, OnInit } from '@angular/core';

 @Component({
   selector: 'app-only-day-picker',
   templateUrl: './only-day-picker.component.html',
   styleUrls: ['./only-day-picker.component.scss']
 })
 export class OnlyDayPickerComponent implements OnInit {
   // 宣告 表頭
   @Input() title: string;

   // 宣告 用途
   @Input() pickMode: 'single' | 'multi';

   // 宣告 日數限制
   @Input() dayLimit: number;

   // 宣告 其他文案
   @Input() note: string;

   // 宣告 默認日期
   @Input() defaultDayVal: string | Array<string>;

   // 宣告 畫面上日期天數 Array
   availableDays: Array<Array<string>> = [];
   // 宣告 單選 的被選天
   selectedDay: string;
   // 宣告 多選 的被選天 Array
   selectedDays: Array<string> = [];

   constructor(
    //  private readonly modalCtrl: ModalController
   ) {
    //  super();
   }

   ngOnInit(): void {

     if (this.dayLimit < 1 || this.dayLimit > 31) {
       throw new Error('日數範圍需1保持在 1 到 31 之間，包含 1 跟 31!');
     } else {
       this.availableDays = this.setDayViewDataStructure(this.dayLimit);

       // 確認默認值型態
       if (this.defaultDayVal) {
         if (typeof this.defaultDayVal !== 'string' && this.pickMode === 'multi') {
           this.selectedDays = this.defaultDayVal;
         } else if (typeof this.defaultDayVal === 'string' && this.pickMode === 'single') {
           this.selectedDay = this.defaultDayVal;
         } else {
           throw new Error('Mode 是 multi 時，defaultDayVal 必需是 Array。Mode 是 single 時，defaultDayVal 必需是 String');
         }
       }
     }

   }

   /**
    * 設定畫面上所用的日期天數的資料結構
    * @param dayLimit - 日數限制
    * @returns Array < Array < string > >
    */
   setDayViewDataStructure(dayLimit: number): Array<Array<string>> {
     const daySet: Array<Array<string>> = [];

     // 算出剩餘日數
     const daysRemained = dayLimit % 7;
     // 算出幾條整數週
     const rows = (dayLimit - daysRemained) / 7;
     // 每週第一天
     const weekFirstDay = [1, 8, 15, 22];

     // 將整數週帶入，如果整數週為兩週
     // daySet: [
     //  ["01", "02", "03", "04", "05", "06", "07"],
     //  ["08", "09", "10", "11", "12", "13", "14"]
     // ]
     for (let i = 0; i < rows; i++) {
       daySet.push(Array.from(Array(7), (_, inx) => {
         return weekFirstDay[i] + inx > 9
           ? `${weekFirstDay[i] + inx}`
           : `0${weekFirstDay[i] + inx}`;
       }));
     }

     // 如果非整數剩餘天數 大於 0
     if (daysRemained > 0) {
       const otherDays = Array.from(Array(daysRemained))
         .map((_, inx) => inx + 1 + (dayLimit - daysRemained) > 9
           ? `${inx +  1 + (dayLimit - daysRemained)}`
           : `0${inx +  1 + (dayLimit - daysRemained)}`);

       // 將剩於天數帶入
       // daySet: [
       //  ["01", "02", "03", "04", "05", "06", "07"],
       //  ["08", "09", "10", "11", "12", "13", "14"],
       //  ["15", "16", "17"]
       // ]
       daySet.push(otherDays);
     }

     return daySet;
   }

   /**
    * 確認在多選 Mode 的 當前被選天 是否已存在
    * @param givenDay - 被選天
    * @returns boolean
    */
   checkIfSelected(givenDay: string): boolean {
     let isSelected: boolean;

     isSelected =
       this.selectedDays.find(day => day.toString() === givenDay)
         ? true
         : false;

     return isSelected;
   }

   /**
    * 點選日期按鈕時
    * @param selectedDay - 被選天
    */
   onSelectDay(selectedDay: string): void {
     // 如果 Mode 是單選
     if (this.pickMode === 'single') {
       this.selectedDay = selectedDay;

     // 如果 Mode 是多選
     } else if (this.pickMode === 'multi') {
       // 找出當前被選天是否已被選
       const foundSelected = this.selectedDays
         .find(day => day.toString() === selectedDay);

       // 如果有找出來
       if (foundSelected) {
         // 刪除該被選天
         this.selectedDays =
           this.selectedDays.filter(day => day.toString() !== selectedDay);

       // 如果沒找出來
       } else {
         // 新增該被選天
         this.selectedDays.push(selectedDay);
       }
     }
   }

   /**
    * 點選取消按鈕時
    */
   onCancel(): void {
    //  this.modalCtrl.dismiss()
    //    .catch();
   }

   /**
    * 點選確認按鈕時
    */
   onConfirm(): void {
     let dataOut: any;

     if (this.pickMode === 'single') {
       dataOut = this.selectedDay;
     } else if (this.pickMode === 'multi') {
       // 預防 List 持有 Duplicates 然後回傳 Sorted List
       dataOut = [...new Set(this.selectedDays)].sort();
     }

    //  this.modalCtrl.dismiss(dataOut)
    //    .catch();
   }
 }
