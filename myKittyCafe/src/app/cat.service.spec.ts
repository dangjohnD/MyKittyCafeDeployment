import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatService } from './cat.service';
import { Cat } from './cat';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;

  const mockCat: Cat = {
    id: 1,
    name: 'Whiskers',
    colour: 'Calico',
    birthday: new Date('2020-01-01'),
    desc: 'A friendly cat',
    disabled: false,
    note: '',
    image: 'https://example.com/cat.jpg',
    adoptable: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService]
    });
    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload a file', () => {
    const file = new File([''], 'cat.jpg', { type: 'image/jpeg' });
    const filename = 'cat.jpg';
    const blobUrl = `${service['blobBaseUrl']}${filename}?${service['sasToken']}`;

    service.uploadFile(file, filename).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(blobUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('x-ms-blob-type')).toBe('BlockBlob');
    req.flush({});
  });

  it('should add a cat', () => {
    service.addCat(mockCat).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCat);
    req.flush({ id: 1 });
  });

  it('should delete a cat by ID', () => {
    const id = 1;

    service.deleteCatById(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a cat', () => {
    service.updateCat(mockCat).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${mockCat.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCat);
    req.flush({});
  });

  it('should get all cats', () => {
    service.getAllCats().subscribe(cats => {
      expect(cats).toEqual([mockCat]);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockCat]);
  });
});