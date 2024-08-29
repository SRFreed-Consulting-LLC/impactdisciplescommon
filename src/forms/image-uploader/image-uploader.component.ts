import { Component, EventEmitter, Input, Output } from '@angular/core';
import CustomFileSystemProvider from 'devextreme/file_management/custom_provider';
import FileSystemItem from 'devextreme/file_management/file_system_item';
import UploadInfo from 'devextreme/file_management/upload_info';
import { FileUploadService } from 'impactdisciplescommon/src/services/utils/file-upload.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html'
})
export class ImageUploaderComponent {
  @Input() imageSelectVisible: boolean = true;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  @Input() card: any;
  @Input() field: string;
  @Input() captureImageName: boolean = false;
  @Input() imageNameField: string;
  @Input() addToList: boolean;

  @Input() height: number = 450;

  fileSystemProvider: any;

  constructor(public fileUploadService: FileUploadService,) {
    this.fileSystemProvider = new CustomFileSystemProvider({
      sizeExpr: 'size',
      dateModifiedExpr: 'timeCreated',

      getItems(parentDirectory: FileSystemItem){
        return fileUploadService.getAllFileItems(parentDirectory)
      },
      uploadFileChunk(file: File, uploadInfo: UploadInfo, destinationDirectory: FileSystemItem){
        return fileUploadService.uploadFile(file, destinationDirectory).then(() => {
         this.getItems(destinationDirectory)
        })
      },
      deleteItem(item: FileSystemItem){
        return fileUploadService.deleteFile(item).then(() => {
          this.getItems(item);
        });
      },
      renameItem(item: FileSystemItem, newName: string){
        return fileUploadService.renameItem(item, newName).then(() => {
          this.getItems(item);
        });
      },
      createDirectory(parentDirectory: FileSystemItem, name: string){
        return fileUploadService.createDirectory(parentDirectory, name).then(() => {
          this.getItems(parentDirectory);
        });
      },
      moveItem(item: FileSystemItem, destinationDirectory: FileSystemItem){
        return fileUploadService.moveItem(item, destinationDirectory).then(() => {
          this.getItems(item);
        });
      },
      copyItem(item: FileSystemItem, destinationDirectory: FileSystemItem){
        return fileUploadService.copyItem(item, destinationDirectory).then(() => {
          this.getItems(item);
        });
      }
    })
  }

  onItemClick(e){
    if(e.selectedItems[0] && e.selectedItems[0].path){
      this.fileUploadService.getFileUrl(e.selectedItems[0]).then(url => {
        e.selectedItems[0].dataItem.url= url;

        if(this.addToList){
          this.card[this.field].push({ name: e.selectedItems[0].dataItem.name, url:e.selectedItems[0].dataItem.url });
        } else {
          this.card[this.field] = e.selectedItems[0].dataItem.url

          if(this.captureImageName){
            this.card[this.imageNameField] = e.selectedItems[0].dataItem.name;
          }
        }
      })
    }
  }

  selectImage(e){
    this.closeImageWindow();
  }

  closeImageWindow(){
    this.imageSelectVisible = false;
    this.imageSelectClosed.emit(false);
  }
}
