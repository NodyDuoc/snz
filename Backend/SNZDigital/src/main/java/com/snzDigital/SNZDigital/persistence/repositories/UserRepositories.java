package com.snzDigital.SNZDigital.persistence.repositories;


import com.snzDigital.SNZDigital.persistence.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;
@Repository
public interface UserRepositories extends CrudRepository<UserEntity, Long> {

    Optional<UserEntity> findUserEntityByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u FROM UserEntity u ORDER BY u.firstName DESC")
    Page<UserEntity> findAllUserPaginado(Pageable pageable);

}
