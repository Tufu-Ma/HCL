import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GameService, Game } from '../../service/game.service';

type ServerCode = 'th' | 'sea' | 'glb';

interface GameItem {
  id: string;
  name: string;
  image: string;
  tag: string;
  path: string;
}

interface SubItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // จับ div แนวนอนของ "เติม UID" เพื่อสั่ง scroll
  @ViewChild('uidRow', { static: false })
  uidRow!: ElementRef<HTMLDivElement>;

  @ViewChild('idpassRow', { static: false })
idpassRow!: ElementRef<HTMLDivElement>;

@ViewChild('subRow', { static: false }) subRow!: ElementRef<HTMLDivElement>;
  // --------------------------
  // SECTION 1: เกมแบบ UID (โชว์การ์ดบนสุด / สไลด์ได้)
  // --------------------------
  uidGames: GameItem[] = [
    {
      id: 'valorant',
      name: 'Valorant',
      image:
        'https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/494762988_1148628937062121_5009522272693516183_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=C00g9Q0kGTEQ7kNvwF9vK8N&_nc_oc=AdnHz7VU6c0Kfz7Mh6hPF8twXp0eIvf0znZTJG3GaDDNAxLkNBKUzVCpRHmtSOa24NkFbCP8EsplvPKuG2jUAIDo&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&_nc_gid=78XNDSQqk2eEaXXrBW8nTQ&oh=00_Affq_VPqXqKcXr0hjKtx0W4XOk6Q8h52bNrSrOjR4QviJw&oe=69055C3E',
      tag: 'UID',
      path: '/game/valorant',
    },
    {
      id: 'lolpc',
      name: 'League of Legends PC',
      image:
        'https://scontent.fbkk29-9.fna.fbcdn.net/v/t39.30808-6/481658160_611499911751510_4966914207878309164_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=S5mTv3W2iHEQ7kNvwGfxoJ6&_nc_oc=AdlJtnbdpb-WAjY4P7NDWhjrp-i8xtOxF6-B_B356ykoIMWi-FBtMi4s_O37yn55cZCNGUpCej_lHyZqNu3tG9H4&_nc_zt=23&_nc_ht=scontent.fbkk29-9.fna&_nc_gid=C0G3WJ4ssVMNv0OE_GVBgg&oh=00_AffQtovYYEXq7TR3EqNg6AMzH7DczQr4RW1QGKPsE96qwA&oe=6905608F',
      tag: 'UID',
      path: '/game/lolpc',
    },
    {
      id: 'wildrift',
      name: 'League of Legends Wild Rift',
      image:
        'https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/482013671_671877668832208_3866990731963055596_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Gs4ZMxFfiYEQ7kNvwFYdhtc&_nc_oc=AdnoWaG9OmFeEdTrOrR25KC2acFY6ChI1QiEd2nRy06KVMirNFivz1dBV5qgYITY_n5c_Y8BDJ4XWCSieJrVD4YF&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&_nc_gid=UnGFvidyoDWEMS_s26H0FA&oh=00_AfdE9u1lLLpxatxEajj1jhwSEZs-8JVSO62rHHl9KQySLw&oe=69055A86',
      tag: 'UID',
      path: '/game/wildrift',
    },
    {
      id: 'tft',
      name: 'Teamfight Tactics',
      image:
        'https://scontent.fbkk29-6.fna.fbcdn.net/v/t39.30808-6/475917192_1343035120447618_7580631604889998297_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ItEmLY06XcIQ7kNvwHXqdZ4&_nc_oc=Adk9M8OTcMaV3z9sjnvqDRJFzV25g9AMpu56oHhDThMxuD6MrrChXwR9qpfGhQoqtC7dbUUG2UMgGKXjNKzg38p_&_nc_zt=23&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=zEzuc3qXa6i7Iig5qQ_kbw&oh=00_AfeJKa4SpGCy4MFOlHN6LMgd_9N1WUn65_zRREqVpZnqNg&oe=69065381',
      tag: 'UID',
      path: '/game/teamfight-tactic',
    },
    {
      id: '2xko',
      name: '2XKO',
      image:
        'https://pbs.twimg.com/media/G2mVNrUXUAA7Z9B?format=jpg&name=large',
      tag: 'UID',
      path: '/game/2xko',
    },
    {
      id: 'sevenknightsrebirth',
      name: 'Seven Knights: Rebirth',
      image:
        'https://scontent.fbkk29-8.fna.fbcdn.net/v/t39.30808-6/499530980_1087166816779026_2954128626102024699_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=CcvhROhqD7EQ7kNvwHLIjE7&_nc_oc=Adm6GljtROC4GKfm9CoW4tKoyU7i1c-ui0Id3ykMn4Ys1MhOfmno9sfKgJvvHPh_XZeESBrYB6kwglpPaXUNXxc2&_nc_zt=23&_nc_ht=scontent.fbkk29-8.fna&_nc_gid=SGsH8QFRrg6uJUqAx8LRwA&oh=00_Affdkt7WsHmQynqnjtPTj8_WJp7dUZR4inle9YQtAa24zg&oe=69058CB7',
      tag: 'UID',
      path: '/game/sevenknightsrebirth',
    },
    {
      id: 'pathofexile2',
      name: 'Path of Exile 2',
      image:
        'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2694490/7a67002ef9c07ecce9506caf5f74f2109d96c195/capsule_616x353.jpg?t=1757031577',
      tag: 'UID',
      path: '/game/pathofexile2',
    },
    {
      id: 'marvelrivals',
      name: 'Marvel Rivals',
      image:
        'https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-6/504011719_122199658310122686_6440503640629080301_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=lXtOgThASw0Q7kNvwFisFLA&_nc_oc=AdnWccV6c-zXqUzNJt-5d3cxto3pp2KXOzldGrY202a6yuJqGKR-LfKubGPhzdgwoJYhbS_O_T9yasUWLCcpuRez&_nc_zt=23&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=TwloX7eHKzTatnTr6LcCIQ&oh=00_Afe1Bv8E7EUNCqIKvt1opHthnuGWhV4NsVHuDOD3uSDY6A&oe=690569F3',
      tag: 'UID',
      path: '/game/marvelrivals',
    },
    {
      id: 'pokemonunite',
      name: 'Pokemon Unite',
      image:
        'https://scontent.fbkk29-8.fna.fbcdn.net/v/t39.30808-6/239397425_122839780022290_2510867773224185822_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=myWbfUwfajMQ7kNvwGCl3C_&_nc_oc=AdnYfqxgJNIDQQVGJBavh8G-NUGWXKz1Z4yf7KW0lY0CgWe5f7av1TtxnAmfE8wCXl2pgPmtO5HLTXukPmkxsgWp&_nc_zt=23&_nc_ht=scontent.fbkk29-8.fna&_nc_gid=_Jfv1e6_EKcmEVW-vlIeLQ&oh=00_AfdH7o6TCNjjbEu6ZLM2J2csDY68VoDyOJNdRGCYBGCTag&oe=69055C44',
      tag: 'UID',
      path: '/game/pokemonunite',
    },
    {
      id: 'arena-breakout',
      name: 'Arena Breakout',
      image:
        'https://nyxgameawards.com/upload/entry/files/NGE101496/39321695183344.jpg',
      tag: 'UID',
      path: '/game/arena-breakout',
    },
    {
      id: 'deltaforcesteampc',
      name: 'Delta Force Steam PC',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBN7J4VUaVwTlWjVliIAlPrzBpM4tBvhZRA&s',
      tag: 'UID',
      path: '/game/deltaforcesteampc',
    },
    {
      id: 'honkaistarrail',
      name: 'Honkai Star Rail',
      image:
        'https://scontent.fbkk29-5.fna.fbcdn.net/v/t39.30808-6/552659408_862501342778553_5526773068693795638_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=eyA2AVZnunAQ7kNvwGwAZd6&_nc_oc=Adl6TxzgRdGblSZgXx87gQWVdmV0tayv4ZKP0-QvmVsRsU_YwffXrMOBCcpHkalJxJCyyzZZzAF2uhvrh_g9OYtU&_nc_zt=23&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=-31APHwZrBLgOvmcMt2ClA&oh=00_AffKh1eGKJmS-kFf6qMKqORBOuX9AdguhTJXXonOEfQy8Q&oe=6905864A',
      tag: 'UID',
      path: '/game/honkaistarrail',
    },
    {
      id: 'genshinimpact',
      name: 'Genshin Impact',
      image:
        'https://scontent.fbkk29-8.fna.fbcdn.net/v/t39.30808-6/568389200_1138626371733602_4634468519440431069_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=D6fbpj65MREQ7kNvwGltMcT&_nc_oc=Adn-SliAlJHlFrX3eyVW0gcBXafwbeeGUzyA7ojSZEg8c5f-1si2sgEoHG3Nxf7MWPifC4CzabrphW9xotInWUC6&_nc_zt=23&_nc_ht=scontent.fbkk29-8.fna&_nc_gid=WW3WRphjCP57gF2f1hjOng&oh=00_Afcv3XDlmz2-uCmgPCIduI-Fxmlath1SDs4tAv826Mveeg&oe=69056EA7',
      tag: 'UID',
      path: '/game/genshin-impact',
    },
    {
      id: 'zenless',
      name: 'Zenless Zone Zero',
      image:
        'https://preview.redd.it/zenless-zone-zero-icon-revealed-official-announcement-v0-fiyaihcffwx81.jpg?auto=webp&s=29cd0931179f9f15f88164e181a146b144fb635b',
      tag: 'UID',
      path: '/game/zenless-zero-zone',
    },
    {
      id: 'wutheringwave',
      name: 'Wuthering Waves',
      image:
        'https://cdn2.steamgriddb.com/icon_thumb/9d435d2e017f7a7384f4e1c6a6f2d169.png',
      tag: 'UID',
      path: '/game/wuthering-wave',
    },
  ];

  // รายการเกม UID หลังผ่านการค้นหา (ไว้ใช้กับ *ngFor)
  filteredGames: GameItem[] = [];

  // --------------------------
  // SECTION 2: เกมแบบ ID-Pass (ดึงจาก API)
  // --------------------------
  apiGames: Game[] = [];

  loading = true;
  error = '';

  // --------------------------
  // UID checker
  // --------------------------
  uid = '';
  uidStatus = '';
  uidOk = false;
  uidBad = false;
  server: ServerCode = 'th';

  // --------------------------
  // search bar
  // --------------------------
  searchTerm = '';

  subItems: SubItem[] = [
    { id: 'netflix', name: 'Netflix', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { id: 'disney', name: 'Disney+ Hotstar', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
    { id: 'max', name: 'Max', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Max_logo.svg' },
    { id: 'prime', name: 'Prime Video', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' },
    { id: 'appletv', name: 'Apple TV+', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV%2B_Logo.svg' },
    { id: 'viu', name: 'VIU', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Viu_logo.svg' },
    { id: 'wetv', name: 'WeTV', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/WeTV_logo.svg' },
    { id: 'iqiyi', name: 'iQIYI', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/IQIYI_logo.svg' },
    { id: 'monomax', name: 'MONOMAX', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Mono_Max_logo.png' },
    { id: 'trueid', name: 'TrueID', subtitle: 'ต่ออายุสมาชิก', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/TrueID_logo.png' },
  ];

  constructor(
    private gameApi: GameService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // ถ้า render บน browser เท่านั้นค่อยอ่าน window.location
    if (isPlatformBrowser(this.platformId)) {
      const params = new URLSearchParams(window.location.search);
      const search = params.get('search');
      if (search) {
        this.searchTerm = search;
      }
    }
  }

  ngOnInit(): void {
    // เริ่มต้น: โชว์ทุกเกม UID ทั้งหมด
    this.filteredGames = [...this.uidGames];

    // โหลดเกมจาก API (โซน ID-Pass)
    this.gameApi.listGames().subscribe({
      next: (res) => {
        this.apiGames = res.filter((g) => (g as any).active);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'โหลดข้อมูลไม่สำเร็จ';
        this.loading = false;
        console.error(err);
      },
    });
  }

  // แปลง server code → text
  get serverText(): string {
    const map: Record<ServerCode, string> = {
      th: 'Thailand (TH)',
      sea: 'Southeast Asia (SEA)',
      glb: 'Global',
    };
    return map[this.server];
  }

  // filter เกม UID ด้วย searchTerm
  applyFilter(): void {
    const q = (this.searchTerm || '').toLowerCase().trim();
    this.filteredGames = this.uidGames.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.tag.toLowerCase().includes(q)
    );
  }

  // event จาก search bar
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilter();
  }

  // ตรวจ uid เป็นตัวเลข 6-20 ตัว
  validateUid(s: string): boolean {
    return /^\d{6,20}$/.test(s);
  }

  checkUid(): void {
    const ok = this.validateUid(this.uid.trim());
    this.uidOk = ok;
    this.uidBad = !ok;
    this.uidStatus = ok
      ? 'พบ UID — พร้อมสำหรับการเติม'
      : 'รูปแบบ UID ไม่ถูกต้อง (ต้องเป็นตัวเลข 6–20 หลัก)';
  }

  // สำหรับ *ngFor trackBy ในโซน ID-Pass
trackById = (_: number, item: Game | GameItem | SubItem) => item.id;


  // ปุ่มลูกศรเลื่อนซ้าย
  scrollLeft(): void {
    if (this.uidRow && this.uidRow.nativeElement) {
      this.uidRow.nativeElement.scrollBy({
        left: -820,
        behavior: 'smooth',
      });
    }
  }

  // ปุ่มลูกศรเลื่อนขวา
  scrollRight(): void {
    if (this.uidRow && this.uidRow.nativeElement) {
      this.uidRow.nativeElement.scrollBy({
        left: 820,
        behavior: 'smooth',
      });
    }
  }
  
scrollLeftIdPass(): void {
  if (this.idpassRow && this.idpassRow.nativeElement) {
    this.idpassRow.nativeElement.scrollBy({
      left: -820,
      behavior: 'smooth'
    });
  }
}

scrollRightIdPass(): void {
  if (this.idpassRow && this.idpassRow.nativeElement) {
    this.idpassRow.nativeElement.scrollBy({
      left: 820,
      behavior: 'smooth'
    });
  }
}

scrollToContent(): void {
  const el = document.getElementById('contentSection');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ปุ่มเลื่อนแถว Subscription
  scrollLeftSub(): void {
    if (this.subRow?.nativeElement) {
      this.subRow.nativeElement.scrollBy({ left: -820, behavior: 'smooth' });
    }
  }
  scrollRightSub(): void {
    if (this.subRow?.nativeElement) {
      this.subRow.nativeElement.scrollBy({ left: 820, behavior: 'smooth' });
    }
  }
}


