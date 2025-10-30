const AGED_BRIE = "Aged Brie"
const SULFURAS = "Sulfuras, Hand of Ragnaros"
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert'


export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
	increaseItemQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1
		}
	}
	decreaseItemQuality() {
		if (this.quality > 0) {
			this.quality = this.quality - 1
		}
	}

	update (){
		if (this.name === SULFURAS) {
			return;
		}
		this.sellIn = this.sellIn - 1;
		switch (this.name) {
			case AGED_BRIE:
				this.increaseItemQuality()
				if (this.sellIn < 0)
					this.increaseItemQuality();
				break;
			case BACKSTAGE_PASS:
				this.increaseItemQuality()
				if (this.sellIn < 0) {
					this.quality = 0;
					break;
				}
				if (this.sellIn < 10) {
					this.increaseItemQuality();
				}
				if (this.sellIn < 5) {
					this.increaseItemQuality();
				}
				break;
			default:
				if (this.sellIn < 0)
					this.decreaseItemQuality();
				this.decreaseItemQuality();
		}
	}
}

export class GildedRose {
	items: Array<Item>;

	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	updateQuality() {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i]
			item.update()
		}

		return this.items;
	}
}
