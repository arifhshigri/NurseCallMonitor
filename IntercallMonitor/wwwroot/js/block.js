function Room(block){
    padding=1;
    this.blockFloorX = this.blockX +padding;
    this.blockFloorY=this.blockY+padding;
    this.roomWidth= 50;
    this.roomHeight=  60;
    room= block.floor.snap.rect(this.blockFloorX,this.blockFloorY,this.roomWidth,this.roomHeight)
    room.attr({
        fill:"#8c92ac",
        filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 1))',

    })

    // bed= block.floor.
    debugger
    bed=Snap().rect(this.blockFloorX+2*padding,this.blockFloorY,20,20)
    bed.attr({
        fill:"#000",
    })
    room.Add(bed)
 


}

function Block(floor,blockWidth,blockHeight){
    this.floor=floor
    padding=5;
    blockWidth = this.floor.floorWidth/2 + 2*padding;
    blockHeight = this.floor.floorHeight ;
    this.blockX = this.floor.floorX + this.floor.floorWidth/2;
    this.blockY=this.floor.floorY+padding;
    this.blockWidth= floorWidth/2-padding;
    this.blockHeight=  blockHeight-2*padding;
    block=this.floor.snap.rect(blockX,this.blockY,this.blockWidth,this.blockHeight )
    block.attr({
        fill:"#fff",
        filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 1))',

    })
    room = Room(this);
// outer.attr({
    //     fill: "#ffff",
    //     stroke: "#c0c0c0",
    //     strokeWidth: 0.5,
    //     'box-shadow':''
    // });

}