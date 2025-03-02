import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: any=[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/item').subscribe({
      next: (data: any) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  setPoints(itemId: string, points: number) {
    this.http.put(`http://localhost:3000/api/item/${itemId}/points`, { points }).subscribe({
      next: (updatedItem: any) => {
        // Update the item in the items array
        const index = this.items.findIndex((item: { itemId: string; }) => item.itemId === itemId);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
      },
      error: (error) => {
        console.error('Error setting points:', error);
      }
    });
  }
}