package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.Cat;
import ca.bluenose.backend.repository.CatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:8100", "https://mykittycafe.azurewebsites.net" })
@RequestMapping("/api/cats")
public class CatController {

    private final CatRepository catRepository;

    @Autowired
    public CatController(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    // Add a new cat
    @PostMapping
    public Cat addCat(@RequestBody Cat cat) {
        return catRepository.save(cat);
    }

    // Update an existing cat
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Cat updateCat(@PathVariable Long id, @RequestBody Cat catDetails) {
        return catRepository.findById(id).map(cat -> {
            cat.setName(catDetails.getName());
            cat.setBirthday(catDetails.getBirthday());
            cat.setColour(catDetails.getColour());
            cat.setDesc(catDetails.getDesc());
            cat.setDisabled(catDetails.isDisabled());
            cat.setNote(catDetails.getNote());
            cat.setImage(catDetails.getImage());
            cat.setAdoptable(catDetails.isAdoptable());
            return catRepository.save(cat);
        }).orElseThrow(() -> new RuntimeException("Cat not found with id " + id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    // Delete cat by ID
    @DeleteMapping("/{id}")
    public void deleteCat(@PathVariable Long id) {
        catRepository.deleteById(id);
    }

    // Get all cats
    @GetMapping
    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    // Get cat by ID
    @GetMapping("/{id}")
    public Cat getCatById(@PathVariable Long id) {
        return catRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cat not found with id " + id));
    }
}
